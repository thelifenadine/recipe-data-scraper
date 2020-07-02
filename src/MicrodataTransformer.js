import find from 'lodash/find';
import microdata from 'microdata-node';
import Transformer from './Transformer';

class MicrodataTransformer extends Transformer {
  constructor(chtml) {
    super(chtml);
    this.type = 'microdata';
  }

  testForData() {
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

export default MicrodataTransformer;
