import logger from './logger';

const recipeModelBuilder = (originalProperties) => {
  const {
    url,
    name,
    image,
    photo,
    thumbnailUrl,
    description,
    cookTime,
    prepTime,
    totalTime,
    recipeYield,
    yield: rYield,
    recipeIngredients,
    recipeIngredient,
    ingredients,
    ingredient,
    recipeInstructions,
    instructions,
    step,
    recipeCategory,
    recipeCuisine,
    recipeType,
    keywords,
    tag,
  } = originalProperties;

  if (step) {
    logger('may need extra parsing?');
  }

  return {
    url,
    name, // string
    image: image || photo || thumbnailUrl, // string
    description, // string
    cookTime, // string
    prepTime, // string
    totalTime, // string
    recipeYield: recipeYield || rYield, // string
    recipeIngredient: recipeIngredient || recipeIngredients || ingredients || ingredient, // array of strings
    recipeInstructions: recipeInstructions || instructions || step, // array of strings
    recipeCategory, // array of strings
    recipeCuisine, // array of strings
    recipeType, // array of strings
    keywords: keywords || tag, // array of strings
  };
};

export default recipeModelBuilder;
