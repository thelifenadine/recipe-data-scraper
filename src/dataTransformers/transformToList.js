import logger from '../logger';

function transformToList(value, key) {
  if (typeof value === 'string') {
    return [value];
  }
  if (Array.isArray(value)) {
    return value;
  }
  logger('another format needed', key);
  return value;
}

export default transformToList;
