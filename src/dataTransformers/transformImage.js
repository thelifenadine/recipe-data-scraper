import logger from '../utils/logger';

function transformImage(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (value.url) {
    return value.url;
  }

  if (Array.isArray(value)) {
    return value[0];
  }

  logger('image in another format', value);
  return value;
}

export default transformImage;
