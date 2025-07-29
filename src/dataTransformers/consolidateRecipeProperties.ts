import logger from '../utils/logger';

interface RawRecipeData {
  url?: any;
  name?: any;
  image?: any;
  photo?: any;
  thumbnailUrl?: any;
  description?: any;
  cookTime?: any;
  prepTime?: any;
  totalTime?: any;
  recipeYield?: any;
  yield?: any;
  recipeIngredients?: any;
  recipeIngredient?: any;
  ingredients?: any;
  ingredient?: any;
  recipeInstructions?: any;
  instructions?: any;
  step?: any;
  recipeCategory?: any;
  recipeCuisine?: any;
  recipeType?: any;
  keywords?: any;
  tag?: any;
  [key: string]: any;
}

interface ConsolidatedProperties {
  url?: any;
  name?: any;
  image?: any;
  description?: any;
  cookTime?: any;
  cookTimeOriginalFormat?: any;
  prepTime?: any;
  prepTimeOriginalFormat?: any;
  totalTime?: any;
  totalTimeOriginalFormat?: any;
  recipeYield?: any;
  recipeIngredients?: any;
  recipeInstructions?: any;
  recipeCategories?: any;
  recipeCuisines?: any;
  recipeTypes?: any;
  keywords?: any;
}

export const consolidateRecipeProperties = (prospectiveProperties: RawRecipeData): ConsolidatedProperties => {
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
    logger('buildRecipeModel:may need extra parsing for step property');
  }

  // consolidate the properties into new model
  return {
    url,
    name, // string
    image: image || photo || thumbnailUrl, // string
    description, // string
    cookTime, // string
    cookTimeOriginalFormat: cookTime, // string
    prepTime, // string
    prepTimeOriginalFormat: prepTime, // string
    totalTime, // string
    totalTimeOriginalFormat: totalTime, // string
    recipeYield: recipeYield || rYield, // string
    recipeIngredients: recipeIngredient || recipeIngredients || ingredients || ingredient, // array of strings
    recipeInstructions: recipeInstructions || instructions || step, // array of strings
    recipeCategories: recipeCategory, // array of strings
    recipeCuisines: recipeCuisine, // array of strings
    recipeTypes: recipeType, // array of strings
    keywords: keywords || tag, // array of strings
  };
};

export default consolidateRecipeProperties; 