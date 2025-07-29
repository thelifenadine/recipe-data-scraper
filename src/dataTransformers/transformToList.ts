import logger from '../utils/logger';

function transformToList(value: string | string[] | any, key?: string): string[] | any {
  if (typeof value === 'string') {
    if (value.includes(',')) {
      return value.split(',').map(item => item.trim());
    }
    return [value];
  }
  if (Array.isArray(value)) {
    return value;
  }
  logger('another format needed', key);
  return value;
}

export default transformToList; 