import { test, describe } from 'node:test';
import assert from 'node:assert';
import { MATCH_LINE_BREAK, MATCH_HTML_TAGS, MATCH_MULTI_SPACE } from './regex';

describe('regex', () => {
  describe('MATCH_HTML_TAGS expected behavior', () => {
    describe('when matched against a string with no html', () => {
      const strWithoutHtml = '<p>test a <a href="go-somewhere">string</a> with</p> html';

      test('the string should not be modified', () => {
        const result = strWithoutHtml.replace(MATCH_HTML_TAGS, '');
        assert.strictEqual(result, 'test a string with html');
      });
    });

    describe('when matched against a string with html', () => {
      const strWithHtml = '<p>test a <a href="go-somewhere">string</a> with</p> html';

      test('the html tags should be removed', () => {
        const result = strWithHtml.replace(MATCH_HTML_TAGS, '');
        assert.strictEqual(result, 'test a string with html');
      });
    });
  });

  describe('MATCH_LINE_BREAK expected behavior', () => {
    describe('when matched against a string with line breaks', () => {
      const strWithLineBreaks = 'test a\r\nstring\nwith\r line breaks';

      test('the line breaks should be replaced with spaces', () => {
        const result = strWithLineBreaks.replace(MATCH_LINE_BREAK, ' ');
        assert.strictEqual(result, 'test a string with  line breaks');
      });
    });

    describe('when matched against a string without line breaks', () => {
      const strWithoutLineBreaks = 'test a string without line breaks';

      test('the string should not be modified', () => {
        const result = strWithoutLineBreaks.replace(MATCH_LINE_BREAK, ' ');
        assert.strictEqual(result, 'test a string without line breaks');
      });
    });
  });

  describe('MATCH_MULTI_SPACE expected behavior', () => {
    describe('when matched against a string with multiple spaces', () => {
      const strWithMultiSpace = 'test a  string    with multiple     spaces';

      test('multiple spaces should be replaced with single spaces', () => {
        const result = strWithMultiSpace.replace(MATCH_MULTI_SPACE, ' ');
        assert.strictEqual(result, 'test a string with multiple spaces');
      });
    });

    describe('when matched against a string with &nbsp;', () => {
      const strWithNbsp = 'test a&nbsp;string&nbsp;&nbsp;with&nbsp;nbsp';

          test('&nbsp; should be replaced with single spaces', () => {
      const result = strWithNbsp.replace(MATCH_MULTI_SPACE, ' ');
      assert.strictEqual(result, 'test a string  with nbsp');
    });
    });

    describe('when matched against a string without multiple spaces', () => {
      const strWithoutMultiSpace = 'test a string without multiple spaces';

      test('the string should not be modified', () => {
        const result = strWithoutMultiSpace.replace(MATCH_MULTI_SPACE, ' ');
        assert.strictEqual(result, 'test a string without multiple spaces');
      });
    });
  });
}); 