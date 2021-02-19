import axios from 'axios';
import cheerio from 'cheerio';
import MicrodataScraper from './scrapers/MicrodataScraper';
import JsonLdScraper from './scrapers/JsonLdScraper';
import logger from './utils/logger';

const errorMessage = 'Could not find recipe data';

export default async (url) => {
  let chtml;

  try {
    // load html from scraped url
    const resp = await axios(url);
    chtml = cheerio.load(resp.data);
  } catch (error) {
    throw new Error(errorMessage);
  }

  try {
    // attempt to find JsonLd data, return recipe or log and continue
    const jsonLdScraper = new JsonLdScraper(chtml, url);
    return {
      ...jsonLdScraper.getRecipe(),
      url,
    };
  } catch (error) {
    logger('main:JsonLdScraper', {
      ...error,
      url,
    });
  }

  try {
    // attempt to find microdata, return recipe or log and continue
    const microdataScraper = new MicrodataScraper(chtml, url);
    return {
      ...microdataScraper.getRecipe(),
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
};
