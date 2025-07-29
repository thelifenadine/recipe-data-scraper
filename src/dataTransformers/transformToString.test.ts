import { test, describe, before } from 'node:test';
import assert from 'node:assert';

describe('transformToString', () => {
  let transformToString: (value: any, key?: string) => any;

  before(async () => {
    // For functional testing with real logger behavior
    const module = await import('./transformToString');
    transformToString = module.default;
  });

  describe('expected behavior when passed a string', () => {
    test('the param should be passed as is', () => {
      const result = transformToString('test');
      assert.strictEqual(result, 'test');
    });
  });

  describe('expected behavior when passed an array', () => {
    test('the string at index 0 should be returned', () => {
      const result = transformToString(['test-1', 'yo']);
      assert.strictEqual(result, 'test-1');
    });

    test('should handle empty array', () => {
      const result = transformToString([]);
      assert.strictEqual(result, undefined);
    });
  });

  describe('expected behavior when something unexpected is passed', () => {
    test('the param passed in should be returned unchanged', () => {
      const input = { nope: 'nope.com' };
      const result = transformToString(input);
      assert.deepStrictEqual(result, { nope: 'nope.com' });
    });

    test('should handle null input', () => {
      const result = transformToString(null);
      assert.strictEqual(result, null);
    });

    test('should handle undefined input', () => {
      const result = transformToString(undefined);
      assert.strictEqual(result, undefined);
    });

    test('should handle number input', () => {
      const result = transformToString(42);
      assert.strictEqual(result, 42);
    });

    test('should handle boolean input', () => {
      const result = transformToString(true);
      assert.strictEqual(result, true);
    });
  });

  describe('with key parameter', () => {
    test('should pass key to logger for unexpected formats', () => {
      const input = { unexpected: 'format' };
      const result = transformToString(input, 'testKey');
      // The function should still return the input unchanged
      assert.deepStrictEqual(result, input);
    });
  });
}); 