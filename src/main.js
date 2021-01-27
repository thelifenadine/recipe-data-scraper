import axios from 'axios';
import cheerio from 'cheerio';
import MicrodataScraper from './scrapers/MicrodataScraper';
import JsonLdScraper from './scrapers/JsonLdScraper';
import getRecipeData from './getRecipeData';

export default async (url) => {
  const resp = await axios(url);
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
  return null;
};
