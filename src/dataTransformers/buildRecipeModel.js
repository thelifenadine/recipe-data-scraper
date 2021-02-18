import forEach from 'lodash/forEach';
import logger from '../logger';
import propertyTransformerMap from './propertyTransformerMap';

export const consolidateRecipeProperties = (prospectiveProperties) => {
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
  } = prospectiveProperties;

  if (step) {
    // didn't find any recipes that use step
    logger('buildRecipeModel:may need extra parsing?');
  }

  // consolidate the properties into new model
  return {
    url,
    name, // string
    image: image || photo || thumbnailUrl, // string
    description, // string
    cookTime, // string
    prepTime, // string
    totalTime, // string
    recipeYield: recipeYield || rYield, // string
    recipeIngredients: recipeIngredient || recipeIngredients || ingredients || ingredient, // array of strings
    recipeInstructions: recipeInstructions || instructions || step, // array of strings
    recipeCategories: recipeCategory, // array of strings
    recipeCuisines: recipeCuisine, // array of strings
    recipeTypes: recipeType, // array of strings
    keywords: keywords || tag, // array of strings
  };
};

export const transformRecipeData = (recipeModel) => {
  // parse and transform the property values
  const transformedRecipe = {};
  forEach(recipeModel, (value, key) => {
    const propertyTransformer = propertyTransformerMap[key];
    if (propertyTransformer && value) {
      transformedRecipe[key] = propertyTransformer(value, key);
    }
  });

  return transformedRecipe;
};

const buildRecipeModel = (prospectiveProperties) => {
  const simpleRecipe = consolidateRecipeProperties(prospectiveProperties);
  return transformRecipeData(simpleRecipe);
};

export default buildRecipeModel;
