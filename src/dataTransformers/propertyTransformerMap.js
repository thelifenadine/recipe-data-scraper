import transformImage from './transformImage';
import transformToList from './transformToList';
import transformToString from './transformToString';
import transformToTime from './transformToTime';
import transformToCleanString from './transformToCleanString';
import transformInstructions from './transformInstructions';
import transformIngredients from './transformIngredients';

const propertyTransformerMap = {
  name: transformToString,
  image: transformImage, // can just be string OR object with url, caption, width, height, thumbnail can be an array of strings
  description: transformToCleanString,
  cookTime: transformToTime,
  prepTime: transformToTime,
  totalTime: transformToTime,
  cookTimeOriginalFormat: transformToString,
  prepTimeOriginalFormat: transformToString,
  totalTimeOriginalFormat: transformToString,
  recipeYield: transformToString,
  recipeIngredients: transformIngredients,
  recipeInstructions: transformInstructions, // could be an array howtosteps - each has text with string
  recipeCategories: transformToList, // array
  recipeCuisines: transformToList, // array
  recipeTypes: transformToList,
  keywords: transformToList,
};

export default propertyTransformerMap;
