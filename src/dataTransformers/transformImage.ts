import logger from '../utils/logger';

interface ImageObject {
  url: string;
  [key: string]: any;
}

function transformImage(value: string | ImageObject | any[] | any): string | any {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object' && 'url' in value) {
    return value.url;
  }

  if (Array.isArray(value)) {
    return value[0];
  }

  logger('image in another format', value);
  return value;
}

export default transformImage; 