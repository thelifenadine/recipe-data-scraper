import cleanIngredientAmounts from '../utils/cleanIngredientAmounts';
import logger from '../utils/logger';

const transformIngredients = (value) => {
  // jsonld
  if (value && typeof value[0] === 'string') {
    return value.map(item => cleanIngredientAmounts(item));
  }

  // array of objects (microdata)
  const mappedItems = [];

  Object.entries(value).forEach(([, item]) => {
    if (item.properties) {
      const { name, amount } = item.properties;
      if (name || amount) {
        const _name = name && name[0];
        const _amount = amount && amount[0];
        const singleLine = _amount ? `${_amount} ${_name}` : _name;
        mappedItems.push(cleanIngredientAmounts(singleLine));
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
