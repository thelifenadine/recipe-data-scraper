import axios from 'axios';
import cheerio from 'cheerio';
import MicrodataTransformer from './MicrodataTransformer';
import JsonLdTransformer from './JsonLdTransformer';
import getRecipeData from './getRecipeData';

export default async (url) => {
  const resp = await axios(url);
  const chtml = cheerio.load(resp.data);

  const jsonLdRecipe = getRecipeData(JsonLdTransformer, chtml, url);
  if (jsonLdRecipe) {
    return {
      ...jsonLdRecipe,
      url,
    };
  }

  const microdataRecipe = getRecipeData(MicrodataTransformer, chtml, url);
  if (microdataRecipe) {
    return {
      ...microdataRecipe,
      url,
    };
  }

  // could add a transformer for rdfa in the future
  return null;
};
