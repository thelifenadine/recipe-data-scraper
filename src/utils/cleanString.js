import { MATCH_HTML_TAGS, MATCH_LINE_BREAK, MATCH_MULTI_SPACE } from './regex';

// for transformInstructions
export default function cleanString(str) {
  return str
    .replace(MATCH_HTML_TAGS, '') // remove html
    .replace(MATCH_LINE_BREAK, ' ') // replace line breaks with spaces
    .replace(MATCH_MULTI_SPACE, ' ') // replace multiple spaces with single spaces
    .trim();
}
