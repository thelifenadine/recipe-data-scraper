const cleanIngredientAmounts = (line) => line
  .replace(/¼/g, '1/4')
  .replace(/½/g, '1/2')
  .replace(/[¾]/g, '3/4');

const transformIngredients = (value) => {
  // jsonld
  if (value && typeof value[0] === 'string') {
    return value.map(item => cleanIngredientAmounts(item));
  }

  // array of objects (microdata)
  return value.map(item => {
    if (item.properties) {
      const { name, amount } = item.properties;
      if (name || amount) {
        const _name = name && name[0];
        const _amount = amount && amount[0];
        const singleLine = _amount ? `${_amount} ${_name}` : _name;
        return cleanIngredientAmounts(singleLine);
      }
    }
    return cleanIngredientAmounts(item);
  });
};

export default transformIngredients;
