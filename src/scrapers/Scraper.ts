import buildRecipeModel from '../dataTransformers/buildRecipeModel';
import logger from '../utils/logger';
import { IScraper } from './types';
import { Recipe } from '../types';
import * as cheerio from 'cheerio';

/*
  class to be extended by scraper classes
    the following must be implemented by the child class:
      testForMetadata:
        this function scrapes the type of metadata particular to the class
        and assigns the data to this.meta
      findRecipeItem
        this function should parse the metadata and assign recipe item to this.recipeItem
*/
abstract class Scraper implements IScraper {
  chtml: cheerio.CheerioAPI;
  type: string = '';
  meta: any = null;
  recipeItem: any = null;
  finalRecipe?: Recipe;

  constructor(chtml: cheerio.CheerioAPI) {
    this.chtml = chtml;
  }

  // Abstract methods that must be implemented by child classes
  abstract testForMetadata(): void;
  abstract findRecipeItem(): void;

  getRecipe(): Recipe {
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

  print(): void {
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