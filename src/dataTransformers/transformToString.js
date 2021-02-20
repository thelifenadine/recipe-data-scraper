import logger from '../utils/logger';

function transformToString(value, key) {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value[0];
  }
  logger('another format needed', key);
  return value;
}

export default transformToString;
