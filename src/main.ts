import axios from 'axios';
import { load } from 'cheerio';
import MicrodataScraper from './scrapers/MicrodataScraper.js';
import JsonLdScraper from './scrapers/JsonLdScraper.js';
import logger from './utils/logger.js';
import { ScrapingOptions, RecipeWithUrl, Recipe } from './types';

const errorMessage = 'Could not find recipe data';

export default async (url: string, options: ScrapingOptions = {}): Promise<RecipeWithUrl> => {
  const {
    printToConsole,
  } = options;

  let chtml: any;

  try {
    // load html from scraped url
    const resp = await axios(url);
    chtml = load(resp.data);
  } catch (error) {
    throw new Error(errorMessage);
  }

  try {
    // attempt to find JsonLd data, return recipe or log and continue
    const jsonLdScraper = new (JsonLdScraper as any)(chtml, url);
    const recipe: Recipe = jsonLdScraper.getRecipe();

    if (printToConsole) {
      jsonLdScraper.print();
    }

    return {
      ...recipe,
      url,
    };
  } catch (error: any) {
    logger('main:JsonLdScraper', {
      ...(error as object),
      url,
    });
  }

  // attempt to find microdata, return recipe or log and continue
  try {
    const microdataScraper = new (MicrodataScraper as any)(chtml, url);
    const recipe: Recipe = microdataScraper.getRecipe();

    if (printToConsole) {
      microdataScraper.print();
    }

    return {
      ...recipe,
      url,
    };
  } catch (error: any) {
    logger('main:MicrodataScraper', {
      ...(error as object),
      url,
    });
  }

  // could add a Scraper for rdfa in the future

  // throw if no recipe found
  throw new Error(errorMessage);
}; 