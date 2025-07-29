import consolidateRecipeProperties from './consolidateRecipeProperties';
import propertyTransformerMap from './propertyTransformerMap';
import { Recipe } from '../types';

interface ProspectiveProperties {
  [key: string]: any;
}

const buildRecipeModel = (prospectiveProperties: ProspectiveProperties): Partial<Recipe> => {
  const recipe = consolidateRecipeProperties(prospectiveProperties);

  // parse and transform the property values
  const transformedRecipe: Partial<Recipe> = {};
  Object.entries(recipe).forEach(([key, value]) => {
    const propertyTransformer = propertyTransformerMap[key];
    if (propertyTransformer && value) {
      (transformedRecipe as any)[key] = propertyTransformer(value, key);
    }
  });

  return transformedRecipe;
};

export default buildRecipeModel; 