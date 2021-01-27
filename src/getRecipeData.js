import logger from './logger';

const getRecipeData = (Scraper, chtml, url) => {
  try {
    const t = new Scraper(chtml);
    return t.getRecipe();
  } catch (error) {
    logger('getRecipeData', {
      ...error,
      url,
    });
    return null;
  }
};

export default getRecipeData;
