import cleanIngredientAmounts from '../utils/cleanIngredientAmounts';
import logger from '../utils/logger';

interface MicrodataIngredientItem {
  properties: {
    name?: string[];
    amount?: string[];
  };
}

interface MicrodataIngredientsValue {
  [key: string]: MicrodataIngredientItem;
}

type IngredientsValue = string[] | MicrodataIngredientsValue;

const transformIngredients = (value: IngredientsValue): string[] => {
  // jsonld
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
    return value.map(item => cleanIngredientAmounts(item));
  }

  // array of objects (microdata)
  const mappedItems: string[] = [];

  Object.entries(value as MicrodataIngredientsValue).forEach(([, item]) => {
    if (item.properties) {
      const { name, amount } = item.properties;
      if (name || amount) {
        const _name = name && name[0];
        const _amount = amount && amount[0];
        const singleLine = _amount ? `${_amount} ${_name}` : _name;
        if (singleLine) {
          mappedItems.push(cleanIngredientAmounts(singleLine));
        }
      }
    }
  });
  // log issue
  if (mappedItems.length) {
    return mappedItems;
  }

  logger('transformIngredients:microdata:item without properties', value);
  return [];
};

export default transformIngredients; 