import { test, describe, before, after, mock } from 'node:test';
import assert from 'node:assert';

describe('cleanIngredientAmounts', () => {
  let cleanIngredientAmounts: (line: string) => string;
  let replaceMock: any;
  let trimMock: any;
  const originalReplace = String.prototype.replace;
  const originalTrim = String.prototype.trim;

  before(async () => {
    // Mock String.prototype methods
    replaceMock = mock.fn(originalReplace);
    trimMock = mock.fn(originalTrim);
    String.prototype.replace = replaceMock;
    String.prototype.trim = trimMock;

    // Import module after mocking
    const cleanIngredientAmountsModule = await import('./cleanIngredientAmounts');
    cleanIngredientAmounts = cleanIngredientAmountsModule.default;
  });

  after(() => {
    // Restore original methods
    String.prototype.replace = originalReplace;
    String.prototype.trim = originalTrim;
    mock.restoreAll();
  });

  describe('expected behavior', () => {
    before(() => {
      replaceMock.mock.resetCalls();
      trimMock.mock.resetCalls();
      cleanIngredientAmounts('test string');
    });

    test('replace should be called 6 times', () => {
      // 4 unicode replacements + 2 regex replacements
      assert.strictEqual(replaceMock.mock.callCount(), 6);
    });

    test('trim should be called once', () => {
      assert.strictEqual(trimMock.mock.callCount(), 1);
    });
  });

  describe('unicode character replacement', () => {
    test('should replace ¼ with 1/4', () => {
      const result = cleanIngredientAmounts('¼ cup flour');
      assert.strictEqual(result.includes('1/4'), true);
    });

    test('should replace ½ with 1/2', () => {
      const result = cleanIngredientAmounts('½ teaspoon salt');
      assert.strictEqual(result.includes('1/2'), true);
    });

    test('should replace ¾ with 3/4', () => {
      const result = cleanIngredientAmounts('¾ pound beef');
      assert.strictEqual(result.includes('3/4'), true);
    });

    test('should replace ⅔ with 2/3', () => {
      const result = cleanIngredientAmounts('⅔ cup sugar');
      assert.strictEqual(result.includes('2/3'), true);
    });
  });
}); 