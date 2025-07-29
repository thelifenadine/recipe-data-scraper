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
    // load html from scraped url
    const resp = await axios(url);
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
    logger('main:JsonLdScraper', {
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
    logger('main:MicrodataScraper', {
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