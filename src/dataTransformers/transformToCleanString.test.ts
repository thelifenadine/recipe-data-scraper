import { test, describe, before } from 'node:test';
import assert from 'node:assert';

describe('transformToCleanString', () => {
  let transformToCleanString: (value: any, key?: string) => string;

  before(async () => {
    const module = await import('./transformToCleanString');
    transformToCleanString = module.default;
  });

  describe('functional behavior tests', () => {
    test('should clean and transform string', () => {
      const result = transformToCleanString('<p>test   string</p>');
      assert.strictEqual(result, 'test string');
    });

    test('should handle array input by taking first element', () => {
      const result = transformToCleanString(['<p>test   string</p>', 'second']);
      assert.strictEqual(result, 'test string');
    });

    test('should handle line breaks and HTML tags', () => {
      const result = transformToCleanString('<div>test\nstring\r\nwith   breaks</div>');
      assert.strictEqual(result, 'test string with breaks');
    });

    test('should handle object types that transformToString passes through', () => {
      const input = { some: 'object' };
      // Objects that don't get converted to strings by transformToString will cause cleanString to fail
      // This is the actual behavior - cleanString expects strings
      assert.throws(() => {
        transformToCleanString(input, 'testKey');
      }, TypeError);
    });

    test('should handle null and undefined inputs', () => {
      // null and undefined passed to cleanString will cause failures since cleanString expects strings
      // This is the actual behavior
      assert.throws(() => {
        transformToCleanString(null);
      }, TypeError);
      
      assert.throws(() => {
        transformToCleanString(undefined);
      }, TypeError);
    });
  });

  describe('dependency chain verification', () => {
    test('should properly chain transformToString and cleanString', () => {
      // Test with HTML that needs both transformation and cleaning
      const input = ['<p>Multiple    spaces   and\n\rbreaks</p>', 'second item'];
      const result = transformToCleanString(input);
      
      // Verify that:
      // 1. transformToString took the first element
      // 2. cleanString removed HTML, normalized spaces, and line breaks
      assert.strictEqual(result, 'Multiple spaces and breaks');
    });

    test('should pass key parameter through the chain', () => {
      // Test with a string that will actually work through the full chain
      const input = ['<p>test string</p>', 'second item'];
      const result = transformToCleanString(input, 'testKey');
      
      // Should successfully chain: transformToString (takes first) -> cleanString (cleans HTML)
      assert.strictEqual(result, 'test string');
    });
  });
}); 