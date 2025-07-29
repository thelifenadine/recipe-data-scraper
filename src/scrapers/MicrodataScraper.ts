import microdata from 'microdata-node';
import Scraper from './Scraper';
import { IMicrodataScraper } from './types';
import { MicrodataResponse } from '../types';
import * as cheerio from 'cheerio';

class MicrodataScraper extends Scraper implements IMicrodataScraper {
  type: 'microdata' = 'microdata';
  meta: MicrodataResponse | null = null;
  recipeItem: any | null = null;

  constructor(chtml: cheerio.CheerioAPI) {
    super(chtml);
  }

  testForMetadata(): void {
    const meta = microdata.toJson(this.chtml.html());
    if (!meta || !meta.items || !meta.items[0]) {
      return;
    }
    this.meta = meta as MicrodataResponse;
  }

  findRecipeItem(): void {
    if (!this.meta || !this.meta.items) return;
    
    const recipe = Object.values(this.meta.items).find(item => (item.type[0].indexOf('Recipe') > -1));
    this.recipeItem = (recipe) ? recipe.properties : null;
  }
}

export default MicrodataScraper; 