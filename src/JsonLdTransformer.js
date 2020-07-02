import find from 'lodash/find';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import logger from './logger';
import Transformer from './Transformer';

class JsonLdTransformer extends Transformer{
  constructor(chtml) {
    super(chtml);
    this.type = 'jsonld';
  }

  testForData() {
    var json = [];
    const jsonLdFromHtml = this.chtml('script[type="application/ld+json"]');

    forEach(jsonLdFromHtml, item => {
      let contents;
      try {
        const data = get(item, 'children[0].data');
        if (data) {
          contents = JSON.parse(data);
        }
      } catch (e) {
        logger('something happened with the json parsing', e);
        // Fail silently, in case there are valid tags
        return;
      }
      if (contents) {
        json.push(contents);
      }
    });

    if (json.length === 0) {
      logger('Error("No JSON-LD valid script tags present on page")');
      return;
    }

    this.meta = json.length > 1 ? json : json[0];
  }

  findRecipeItem() {
    if (this.meta['@type'] === 'Recipe') {
      // nytimes, food.com, bonappetite, ohsheglows, simplyrecipes
      this.recipeItem = this.meta;
      return;
    }
    // @graph: king arthur, 12tomatoes, sallysbaking, cookie&kate
    // other: martha stewart, foodnetwork, eatingwell, allrecipes, myrecipes, seriouseats, skinnytaste
    const graphLevel = this.meta['@graph'] || this.meta;
    this.recipeItem = find(graphLevel, item => (item['@type'] === 'Recipe'));
  }
}

export default JsonLdTransformer;
