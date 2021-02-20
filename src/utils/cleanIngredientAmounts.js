const cleanIngredientAmounts = (line) => line
  .replace(/¼/g, '1/4')
  .replace(/½/g, '1/2')
  .replace(/¾/g, '3/4');

export default cleanIngredientAmounts;
