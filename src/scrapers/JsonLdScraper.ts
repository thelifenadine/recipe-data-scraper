import logger from '../utils/logger';
import Scraper from './Scraper';
import { IJsonLdScraper } from './types';
import { JsonLdRecipe } from '../types';
import * as cheerio from 'cheerio';

class JsonLdScraper extends Scraper implements IJsonLdScraper {
  type = 'jsonld' as const;
  meta: JsonLdRecipe | JsonLdRecipe[] | null = null;
  recipeItem: JsonLdRecipe | null = null;

  constructor(chtml: cheerio.CheerioAPI) {
    super(chtml);
  }

  testForMetadata(): void {
    const json: JsonLdRecipe[] = [];
    const jsonLdFromHtml = this.chtml('script[type="application/ld+json"]');

    Object.entries(jsonLdFromHtml).forEach(([, item]) => {
      let contents: JsonLdRecipe | undefined;
      try {
        if (item && 'children' in item && item.children && item.children[0] && 'data' in item.children[0]) {
          contents = JSON.parse((item.children[0] as any).data);
        }
      } catch (e) {
        logger('JsonLd: error parsing the json data', e);
        // Fail silently, in case there are valid tags
        return;
      }
      if (contents) {
        json.push(contents);
      }
    });

    if (json.length === 0) {
      logger('Error: No JSON-LD valid script tags present on page');
      return;
    }

    this.meta = json.length > 1 ? json : json[0];
  }

  findRecipeItem(): void {
    if (!this.meta) return;

    if (Array.isArray(this.meta)) {
      // Handle array case
      this.recipeItem = this.meta.find(item => item['@type'] === 'Recipe') || null;
      return;
    }

    if (this.meta['@type'] === 'Recipe') {
      // nytimes, food.com, bonappetite, ohsheglows, simplyrecipes
      this.recipeItem = this.meta;
      return;
    }
    
    // @graph: king arthur, 12tomatoes, sallysbaking, cookie&kate
    // other: martha stewart, foodnetwork, eatingwell, allrecipes, myrecipes, seriouseats, skinnytaste
    const graphLevel = this.meta['@graph'] || this.meta;
    this.recipeItem = Object.values(graphLevel).find((item: any) => (item['@type'] === 'Recipe')) as JsonLdRecipe || null;
  }
}

export default JsonLdScraper; 