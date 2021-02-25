import { MATCH_HTML_TAGS, MATCH_MULTI_SPACE } from './regex';

const cleanIngredientAmounts = (line) => line
  .replace(/¼/g, '1/4')
  .replace(/½/g, '1/2')
  .replace(/¾/g, '3/4')
  .replace(/⅔/g, '2/3')
  .replace(MATCH_HTML_TAGS, '')
  .replace(MATCH_MULTI_SPACE, ' ')
  .trim();

export default cleanIngredientAmounts;
