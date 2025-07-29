import { test, describe } from 'node:test';
import assert from 'node:assert';
import transformISOToString from './transformIsoToString';

describe('transformISOToString', () => {
  describe('expected behavior when passed an object with days', () => {
    test('should return a string with the correct number of days', () => {
      const result = transformISOToString({ days: 1 });
      assert.strictEqual(result, '1 day');
    });

    test('should return a string with the correct number of days (plural)', () => {
      const result = transformISOToString({ days: 2 });
      assert.strictEqual(result, '2 days');
    });
  });

  describe('expected behavior when passed an object with hours', () => {
    test('should return a string with the correct number of hours', () => {
      const result = transformISOToString({ hours: 1 });
      assert.strictEqual(result, '1 hour');
    });

    test('should return a string with the correct number of hours (plural)', () => {
      const result = transformISOToString({ hours: 2 });
      assert.strictEqual(result, '2 hours');
    });
  });

  describe('expected behavior when passed an object with minutes', () => {
    test('should return a string with the correct number of minutes', () => {
      const result = transformISOToString({ minutes: 1 });
      assert.strictEqual(result, '1 minute');
    });

    test('should return a string with the correct number of minutes (plural)', () => {
      const result = transformISOToString({ minutes: 30 });
      assert.strictEqual(result, '30 minutes');
    });
  });

  describe('expected behavior when passed an object with seconds', () => {
    test('should return a string with the correct number of seconds', () => {
      const result = transformISOToString({ seconds: 1 });
      assert.strictEqual(result, '1 second');
    });

    test('should return a string with the correct number of seconds (plural)', () => {
      const result = transformISOToString({ seconds: 45 });
      assert.strictEqual(result, '45 seconds');
    });
  });

  describe('expected behavior when passed an object with multiple time units', () => {
    test('should return a string with all time units', () => {
      const result = transformISOToString({ days: 1, hours: 2, minutes: 30, seconds: 45 });
      assert.strictEqual(result, '1 day 2 hours 30 minutes 45 seconds');
    });

    test('should handle mixed singular and plural', () => {
      const result = transformISOToString({ days: 1, hours: 1, minutes: 30, seconds: 1 });
      assert.strictEqual(result, '1 day 1 hour 30 minutes 1 second');
    });
  });

  describe('expected behavior when passed an empty object', () => {
    test('should return an empty string', () => {
      const result = transformISOToString({});
      assert.strictEqual(result, '');
    });
  });

  describe('expected behavior when passed no arguments', () => {
    test('should return an empty string', () => {
      const result = transformISOToString();
      assert.strictEqual(result, '');
    });
  });
}); 