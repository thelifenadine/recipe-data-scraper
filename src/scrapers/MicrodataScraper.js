import find from 'lodash/find';
import microdata from 'microdata-node';
import Scraper from './Scraper';

class MicrodataScraper extends Scraper {
  constructor(chtml) {
    super(chtml);
    this.type = 'microdata';
  }

  testForMetadata() {
    const meta = microdata.toJson(this.chtml.html());
    if (!meta || !meta.items || !meta.items[0]) {
      return;
    }
    this.meta = meta;
  }

  findRecipeItem() {
    const recipe = find(this.meta.items, item => (item.type[0].indexOf('Recipe') > -1));
    this.recipeItem = (recipe) ? recipe.properties : null;
  }
}

export default MicrodataScraper;
