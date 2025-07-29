import logger from '../utils/logger';
import cleanString from '../utils/cleanString';

interface InstructionObject {
  text: string;
}

type InstructionsValue = string | string[] | InstructionObject[];

function transformInstructions(value: InstructionsValue): string[] | undefined {
  if (typeof value === 'string') {
    const cleanedValue = cleanString(value);
    if (cleanedValue.includes('.,')) {
      // special case for kingarthurflour.com
      return cleanedValue.split('.,').map(item => item.trim());
    }

    return [cleanedValue];
  }

  if (Array.isArray(value)) {
    // microdata
    const firstItem = value[0];
    if (typeof firstItem === 'string') {
      return (value as string[]).map(item => cleanString(item)); // loop through items and clean
    }

    // json ld
    return (value as InstructionObject[]).map((item: InstructionObject) => {
      if (item.text) {
        return cleanString(item.text);
      } else {
        logger('recipe instructions array has different format', value);
        return '';
      }
    });
  }
}

export default transformInstructions; 