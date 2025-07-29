import { test, describe } from 'node:test';
import assert from 'node:assert';
import transformImage from './transformImage';

describe('transformImage', () => {
  describe('expected behavior when passed a string', () => {
    test('should return the string as is', () => {
      const result = transformImage('https://example.com/image.jpg');
      assert.strictEqual(result, 'https://example.com/image.jpg');
    });

    test('should handle empty string', () => {
      const result = transformImage('');
      assert.strictEqual(result, '');
    });
  });

  describe('expected behavior when passed an array', () => {
    test('should return the first element', () => {
      const result = transformImage(['https://example.com/image1.jpg', 'https://example.com/image2.jpg']);
      assert.strictEqual(result, 'https://example.com/image1.jpg');
    });

    test('should handle empty array', () => {
      const result = transformImage([]);
      assert.strictEqual(result, undefined);
    });
  });

  describe('expected behavior when passed an object with url property', () => {
    test('should return the url property value', () => {
      const imageObj = { url: 'hiya.com', alt: 'Test image' };
      const result = transformImage(imageObj);
      assert.strictEqual(result, 'hiya.com');
    });

    test('should handle object with url and other properties', () => {
      const imageObj = { 
        url: 'https://example.com/photo.jpg',
        width: 800,
        height: 600,
        alt: 'Beautiful photo'
      };
      const result = transformImage(imageObj);
      assert.strictEqual(result, 'https://example.com/photo.jpg');
    });
  });

  describe('expected behavior when something unexpected is passed', () => {
    test('should return the input unchanged for objects without url', () => {
      const input = { nope: 'nope.com' };
      const result = transformImage(input);
      assert.deepStrictEqual(result, { nope: 'nope.com' });
    });

    test('should handle null input', () => {
      const result = transformImage(null);
      assert.strictEqual(result, null);
    });

    test('should handle undefined input', () => {
      const result = transformImage(undefined);
      assert.strictEqual(result, undefined);
    });

    test('should handle number input', () => {
      const result = transformImage(42);
      assert.strictEqual(result, 42);
    });

    test('should handle boolean input', () => {
      const result = transformImage(false);
      assert.strictEqual(result, false);
    });
  });

  describe('edge cases', () => {
    test('should handle object with url property that is not a string', () => {
      const input = { url: 123 };
      const result = transformImage(input);
      assert.strictEqual(result, 123);
    });

    test('should handle object with null url property', () => {
      const input = { url: null };
      const result = transformImage(input);
      assert.strictEqual(result, null);
    });
  });
}); 