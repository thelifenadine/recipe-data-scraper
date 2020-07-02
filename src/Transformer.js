import forEach from 'lodash/forEach';
import propertyMapper from './propertyMapper';
import recipeModelBuilder from './recipeModelBuilder';
import logger from './logger';

class Transformer {
  constructor(chtml) {
    this.chtml = chtml;

    // reset
    this.meta = null;
    this.recipeItem = null;
  }

  getRecipe() {
    this.testForData();
    if (!this.meta) {
      throw {
        message: 'no meta data was found',
        type: this.type,
      };
    }

    this.findRecipeItem();
    if (!this.recipeItem) {
      throw {
        message: 'found metadata, but no recipe information',
        type: this.type,
      };
    }

    try {
      this.transformToFinalModel();
      return this.finalRecipe;
    } catch (error) {
      throw {
        message: 'found recipe information, there was a problem with mapping the data',
        type: this.type,
      };
    }
  }

  transformToFinalModel() {
    const initialProperties = {};

    forEach(this.recipeItem, (value, key) => {
      const propertyTransformer = propertyMapper[key];
      if (propertyTransformer && value) {
        initialProperties[key] = propertyTransformer(value, key);
      }
    });
    this.finalRecipe = recipeModelBuilder(initialProperties);
  }

  print() {
    if (this.recipeItem) {
      logger(' - - - - - - - - - - - - ');
      logger('original recipe data');
      logger(this.recipeItem);
      logger(' - - - - - - - - - - - - ');
    }

    if (this.finalRecipe) {
      logger(' ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ');
      logger('transformed recipe data');
      logger(this.finalRecipe);
      logger(' ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ');
    }
  }
}

export default Transformer;
