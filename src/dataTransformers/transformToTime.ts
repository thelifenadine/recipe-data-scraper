import logger from '../utils/logger';
import { parse as parseISO } from 'iso8601-duration';
import transformISOToString from '../utils/transformIsoToString';
import transformToString from './transformToString';

function transformToTime(value: string | any, key?: string): string | any {
  const stringValue = transformToString(value, key);
  
  if (typeof stringValue !== 'string') {
    return stringValue;
  }

  try {
    const parsedDuration = parseISO(stringValue);
    const transformedTime = transformISOToString(parsedDuration);
    return transformedTime || stringValue;
  } catch {
    logger('ISO date parsing failure for', key);
    return stringValue;
  }
}

export default transformToTime; 