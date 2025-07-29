import { test, describe } from 'node:test';
import assert from 'node:assert';
import transformToTime from './transformToTime';

describe('transformToTime', () => {
  describe('expected behavior when passed an ISO duration string', () => {
    test('should convert PT30M to readable format', () => {
      const result = transformToTime('PT30M');
      assert.strictEqual(result, '30 minutes');
    });

    test('should convert PT1H30M to readable format', () => {
      const result = transformToTime('PT1H30M');
      assert.strictEqual(result, '1 hour 30 minutes');
    });

    test('should convert P1DT2H30M to readable format', () => {
      const result = transformToTime('P1DT2H30M');
      assert.strictEqual(result, '1 day 2 hours 30 minutes');
    });
  });

  describe('expected behavior when passed a regular string', () => {
    test('should return the string as is', () => {
      const result = transformToTime('30 minutes');
      assert.strictEqual(result, '30 minutes');
    });
  });

  describe('expected behavior when passed an array', () => {
    test('should process the first element', () => {
      const result = transformToTime(['PT30M', 'PT1H']);
      assert.strictEqual(result, '30 minutes');
    });
  });

  describe('expected behavior when passed something else', () => {
    test('should return the value as is', () => {
      const input = { duration: 'PT30M' };
      const result = transformToTime(input, 'testKey');
      assert.deepStrictEqual(result, { duration: 'PT30M' });
    });
  });
}); 