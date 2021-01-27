import axios from 'axios';
import cheerio from 'cheerio';
import MicrodataScraper from './scrapers/MicrodataScraper';
import JsonLdScraper from './scrapers/JsonLdScraper';
import getRecipeData from './getRecipeData';

const errorMessage = 'Could not find recipe data';

export default async (url) => {
  let resp;

  try {
    resp = await axios(url);
  } catch (error) {
    throw new Error(errorMessage);
  }

  const chtml = cheerio.load(resp.data);

  const jsonLdRecipe = getRecipeData(JsonLdScraper, chtml, url);
  if (jsonLdRecipe) {
    return {
      ...jsonLdRecipe,
      url,
    };
  }

  const microdataRecipe = getRecipeData(MicrodataScraper, chtml, url);
  if (microdataRecipe) {
    return {
      ...microdataRecipe,
      url,
    };
  }

  // could add a transformer for rdfa in the future

  throw new Error(errorMessage);
};
