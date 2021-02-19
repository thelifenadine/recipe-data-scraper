import forEach from 'lodash/forEach';
import consolidateRecipeProperties from './consolidateRecipeProperties';
import propertyTransformerMap from './propertyTransformerMap';

const buildRecipeModel = (prospectiveProperties) => {
  const recipe = consolidateRecipeProperties(prospectiveProperties);

  // parse and transform the property values
  const transformedRecipe = {};
  forEach(recipe, (value, key) => {
    const propertyTransformer = propertyTransformerMap[key];
    if (propertyTransformer && value) {
      transformedRecipe[key] = propertyTransformer(value, key);
    }
  });

  return transformedRecipe;
};

export default buildRecipeModel;
