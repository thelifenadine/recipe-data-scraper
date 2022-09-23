import axios from 'axios';
import cheerio from 'cheerio';
import MicrodataScraper from './scrapers/MicrodataScraper';
import JsonLdScraper from './scrapers/JsonLdScraper';
import logger from './utils/logger';

const errorMessage = 'Could not find recipe data';

export function parse(html, options = {}) {
  const {
    printToConsole,
    url,
  } = options;

  const chtml = cheerio.load(html);

  try {
    // attempt to find JsonLd data, return recipe or log and continue
    const jsonLdScraper = new JsonLdScraper(chtml, url);
    const recipe = jsonLdScraper.getRecipe();

    if (printToConsole) {
      jsonLdScraper.print();
    }

    return {
      ...recipe,
      url,
    };
  } catch (error) {
    logger('main:JsonLdScraper', {
      ...error,
      url,
    });
  }

  // attempt to find microdata, return recipe or log and continue
  try {
    const microdataScraper = new MicrodataScraper(chtml, url);
    const recipe = microdataScraper.getRecipe();

    if (printToConsole) {
      microdataScraper.print();
    }

    return {
      ...recipe,
      url,
    };
  } catch (error) {
    logger('main:MicrodataScraper', {
      ...error,
      url,
    });
  }

  // could add a Scraper for rdfa in the future

  // throw if no recipe found
  throw new Error(errorMessage);
}

export default async (url, options = {}) => {
  const {
    printToConsole,
  } = options;

  let resp;

  try {
    // load html from scraped url
    resp = await axios(url);
  } catch (error) {
    throw new Error(errorMessage);
  }

  return parse(resp.data, {
    url,
    ...options,
  })
};
