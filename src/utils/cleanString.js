/*
  <[^>]*>?
  match html tags on either side of a string

  &nbsp;
  match &nbsp;

  (\r\n|\n|\r)
  match new line characters

  \s\s+
  match multiple spaces or tabs

  g
  global

  m
  multiline

*/

export const MATCH_HTML_TAGS = /<[^>]*>?/gm;
const MATCH_LINE_BREAK = /(\r\n|\n|\r)/gm;
const MATCH_MULTI_SPACE = /&nbsp;|\s\s+/gm; // or &nbsp;

export default function cleanString(str) {
  return str
    .replace(MATCH_HTML_TAGS, '')
    .replace(MATCH_LINE_BREAK, ' ')
    .replace(MATCH_MULTI_SPACE, ' ')
    .trim();
}
