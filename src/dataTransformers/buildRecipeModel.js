import consolidateRecipeProperties from './consolidateRecipeProperties';
import propertyTransformerMap from './propertyTransformerMap';

const buildRecipeModel = (prospectiveProperties) => {
  const recipe = consolidateRecipeProperties(prospectiveProperties);

  // parse and transform the property values
  const transformedRecipe = {};
  Object.entries(recipe).forEach(([key, value]) => {
    const propertyTransformer = propertyTransformerMap[key];
    if (propertyTransformer && value) {
      transformedRecipe[key] = propertyTransformer(value, key);
    }
  });

  return transformedRecipe;
};

export default buildRecipeModel;
