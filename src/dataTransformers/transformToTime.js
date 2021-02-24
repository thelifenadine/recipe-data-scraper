import logger from '../utils/logger';
import { parse } from 'iso8601-duration';
import transformToString from './transformToString';
import transformISOToString from '../utils/transformIsoToString';

function transformToTime(value, key) {
  const time = transformToString(value);
  try {
    const parsedISODuration = parse(time);
    if (parsedISODuration) {
      return transformISOToString(parsedISODuration);
    }
  } catch (error) {
    // fail silently and return original time
    logger(`ISO date parsing failure for ${key}`);
  }

  return time;
}

export default transformToTime;
