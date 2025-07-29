import axios from 'axios';
import { load } from 'cheerio';
import MicrodataScraper from './scrapers/MicrodataScraper';
import JsonLdScraper from './scrapers/JsonLdScraper';
import logger from './utils/logger';
import { ScrapingOptions, RecipeWithUrl } from './types';

const errorMessage: string = 'Could not find recipe data';

export default async (url: string, options: ScrapingOptions = {}): Promise<RecipeWithUrl> => {
  const {
    printToConsole,
  } = options;

  let chtml;

  try {
    // load html from scraped url with site-specific User-Agent handling
    const requestConfig: any = { url };
    const hostname = new URL(url).hostname;

    // Sites that block axios User-Agent and need browser User-Agent
    const browserUserAgentSites = [
      'www.foodnetwork.com',
      'foodnetwork.com',
      'www.saveur.com',
      'saveur.com'
    ];

    if (browserUserAgentSites.includes(hostname)) {
      requestConfig.headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      };
    }

    const resp = await axios(requestConfig);
    chtml = load(resp.data);
  } catch {
    throw new Error(errorMessage);
  }

  try {
    // attempt to find JsonLd data, return recipe or log and continue
    const jsonLdScraper = new JsonLdScraper(chtml);
    const recipe = jsonLdScraper.getRecipe();

    if (printToConsole) {
      jsonLdScraper.print();
    }

    return {
      ...recipe,
      url,
    };
  } catch (error: unknown) {
    logger('JsonLdScraper failed', {
      ...(error as object),
      url,
    });
  }

  // attempt to find microdata, return recipe or log and continue
  try {
    const microdataScraper = new MicrodataScraper(chtml);
    const recipe = microdataScraper.getRecipe();

    if (printToConsole) {
      microdataScraper.print();
    }

    return {
      ...recipe,
      url,
    };
  } catch (error: unknown) {
    logger('MicrodataScraper failed', {
      ...(error as object),
      url,
    });
  }

  // could add a Scraper for rdfa in the future

  // throw if no recipe found
  throw new Error(errorMessage);
};

// Re-export all types for consumers
export * from './types'; 