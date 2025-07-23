import logger from '../utils/logger';
import Scraper from './Scraper';

function hasRecipeType(meta) {
  // Check if @type exists
  if (meta['@type'] == undefined) return false;
  let type = meta["@type"]
  // If it's recipe, we're golden
  if (type === 'Recipe') return true;
  // If it's an array, see if it's in there
  if (Array.isArray(type)) {
    if (type.indexOf("Recipe") != -1) return true;
  }
  return false;
}

class JsonLdScraper extends Scraper {
  constructor(chtml) {
    super(chtml);
    this.type = 'jsonld';
  }

  testForMetadata() {
    var json = [];
    const jsonLdFromHtml = this.chtml('script[type="application/ld+json"]');

    Object.entries(jsonLdFromHtml).forEach(([ , item]) => {
      let contents;
      try {
        if (item && item.children && item.children[0] && item.children[0].data) {
          contents = JSON.parse(item.children[0].data);
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

  findRecipeItem() {
    // nytimes, food.com, bonappetite, ohsheglows, simplyrecipes
    if (hasRecipeType(this.meta)) {
      this.recipeItem = this.meta;
      return;
    }
    // @graph: king arthur, 12tomatoes, sallysbaking, cookie&kate
    // other: martha stewart, foodnetwork, eatingwell, allrecipes, myrecipes, seriouseats, skinnytaste
    const graphLevel = this.meta['@graph'] || this.meta;
    this.recipeItem = Object.values(graphLevel).find(item => (hasRecipeType(item)));
  }
}

export default JsonLdScraper;
