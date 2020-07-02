import logger from './logger';

const getRecipeData = (Transformer, chtml, url) => {
  try {
    const t = new Transformer(chtml);
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
