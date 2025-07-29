import { test, describe } from 'node:test';
import assert from 'node:assert';
import transformToList from './transformToList';

describe('transformToList', () => {
  describe('expected behavior when passed a simple string', () => {
    test('should return the string in an array', () => {
      const result = transformToList('test of something simple');
      assert.deepStrictEqual(result, ['test of something simple']);
    });

    test('should handle empty string', () => {
      const result = transformToList('');
      assert.deepStrictEqual(result, ['']);
    });
  });

  describe('expected behavior when passed a comma-separated string', () => {
    test('should split on commas and trim whitespace', () => {
      const result = transformToList('test, of something, simple');
      assert.deepStrictEqual(result, ['test', 'of something', 'simple']);
    });

    test('should handle extra spaces around commas', () => {
      const result = transformToList('item1  ,   item2,item3   ,  item4');
      assert.deepStrictEqual(result, ['item1', 'item2', 'item3', 'item4']);
    });

    test('should handle single comma at end', () => {
      const result = transformToList('single item,');
      assert.deepStrictEqual(result, ['single item', '']);
    });
  });

  describe('expected behavior when passed an array', () => {
    test('should return the array unchanged', () => {
      const input = ['test-1', 'yo'];
      const result = transformToList(input);
      assert.deepStrictEqual(result, ['test-1', 'yo']);
    });

    test('should handle empty array', () => {
      const result = transformToList([]);
      assert.deepStrictEqual(result, []);
    });

    test('should handle array with mixed types', () => {
      const input = ['string', 123, true];
      const result = transformToList(input);
      assert.deepStrictEqual(result, ['string', 123, true]);
    });
  });

  describe('expected behavior when something unexpected is passed', () => {
    test('should return the input unchanged for objects', () => {
      const input = { nope: 'nope.com' };
      const result = transformToList(input, 'testKey');
      assert.deepStrictEqual(result, { nope: 'nope.com' });
    });

    test('should handle null input', () => {
      const result = transformToList(null);
      assert.strictEqual(result, null);
    });

    test('should handle undefined input', () => {
      const result = transformToList(undefined);
      assert.strictEqual(result, undefined);
    });

    test('should handle number input', () => {
      const result = transformToList(42);
      assert.strictEqual(result, 42);
    });

    test('should handle boolean input', () => {
      const result = transformToList(false);
      assert.strictEqual(result, false);
    });
  });

  describe('edge cases with comma handling', () => {
    test('should handle string with no commas', () => {
      const result = transformToList('single item no commas');
      assert.deepStrictEqual(result, ['single item no commas']);
    });

    test('should handle string that is just commas', () => {
      const result = transformToList(',,,');
      assert.deepStrictEqual(result, ['', '', '', '']);
    });

    test('should handle mixed comma and non-comma content', () => {
      const result = transformToList('first, second item no comma third, fourth');
      assert.deepStrictEqual(result, ['first', 'second item no comma third', 'fourth']);
    });
  });
}); 