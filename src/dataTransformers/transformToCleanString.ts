import cleanString from '../utils/cleanString';
import transformToString from './transformToString';

function transformToCleanString(value: string | string[] | any, key?: string): string {
  return cleanString(transformToString(value, key));
}

export default transformToCleanString; 