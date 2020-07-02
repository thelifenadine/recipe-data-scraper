import transformImage from './transformers/transformImage';
import transformToList from './transformers/transformToList';
import transformToString from './transformers/transformToString';
import transformInstructions from './transformers/transformInstructions';
import transformIngedients from './transformers/transformIngredients';

const propertyMapper = {
  name: transformToString,
  image: transformImage, // can just be string OR object with url, caption, width, height, thumbnail can be an array of strings
  photo: transformImage,
  thumbnailUrl: transformImage,
  description: transformToString,
  cookTime: transformToString,
  prepTime: transformToString,
  totalTime: transformToString,
  recipeYield: transformToString,
  yield: transformToString,
  recipeIngredients: transformIngedients,
  recipeIngredient: transformIngedients,
  ingredients: transformIngedients,
  ingredient: transformIngedients,
  recipeInstructions: transformInstructions, // could be an array howtosteps - each has text with string
  instructions: transformInstructions,
  step: transformInstructions,
  recipeCategory: transformToList, // can be array of strings
  recipeCuisine: transformToList, // can be array of strings
  recipeType: transformToList,
  keywords: transformToList,
  tag: transformToList,
};

export default propertyMapper;
