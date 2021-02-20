import logger from '../utils/logger';

function transformInstructions(value) {
  if (typeof value === 'string') {
    return [value];
  }

  if (Array.isArray(value)) {
    // microdata
    const firstItem = value[0];
    if (typeof firstItem === 'string') {
      return value;
    }

    // json ld
    return value.map(item => {
      if (item.text) {
        return item.text;
      } else {
        logger('recipeinstructions array has different format', value);
      }
    });
  }
}

export default transformInstructions;
