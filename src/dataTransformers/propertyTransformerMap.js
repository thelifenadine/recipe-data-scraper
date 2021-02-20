import transformImage from './transformImage';
import transformToList from './transformToList';
import transformToString from './transformToString';
import transformInstructions from './transformInstructions';
import transformIngredients from './transformIngredients';

const propertyTransformerMap = {
  name: transformToString,
  image: transformImage, // can just be string OR object with url, caption, width, height, thumbnail can be an array of strings
  description: transformToString,
  cookTime: transformToString,
  prepTime: transformToString,
  totalTime: transformToString,
  recipeYield: transformToString,
  recipeIngredients: transformIngredients,
  recipeInstructions: transformInstructions, // could be an array howtosteps - each has text with string
  recipeCategories: transformToList, // array
  recipeCuisines: transformToList, // array
  recipeTypes: transformToList,
  keywords: transformToList,
};

export default propertyTransformerMap;
