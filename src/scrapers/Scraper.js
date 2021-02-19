import buildRecipeModel from '../dataTransformers/buildRecipeModel';
import logger from '../utils/logger';

/*
  class to be extended by scraper classes
    the following must be implemented by the child class:
      testForMetadata:
        this function scrapes the type of metadata particular to the class
        and assigns the data to this.meta
      findRecipeItem
        this function should parse the metadata and assign recipe item to this.recipeItem
*/
class Scraper {
  constructor(chtml) {
    this.chtml = chtml;

    this.meta = null;
    this.recipeItem = null;

    if (!this.testForMetadata) {
      throw {
        message: 'testForMetadata function must be implemented by child class',
      };
    }

    if (!this.findRecipeItem) {
      throw {
        message: 'findRecipeItem function must be implemented by child class',
      };
    }
  }

  getRecipe() {
    this.testForMetadata();

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
      this.finalRecipe = buildRecipeModel(this.recipeItem);

      return this.finalRecipe;
    } catch (error) {
      throw {
        message: 'found recipe information, there was a problem with mapping the data',
        type: this.type,
      };
    }
  }

  print() {
    if (this.recipeItem) {
      logger(' - - - - - - - - - - - - ');
      logger('original recipe data');
      logger(`type: ${this.type}`);
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

export default Scraper;
