import cleanString from '../utils/cleanString';
import transformToString from './transformToString';

function transformToCleanString(value, key) {
  return cleanString(transformToString(value, key));
}

export default transformToCleanString;
