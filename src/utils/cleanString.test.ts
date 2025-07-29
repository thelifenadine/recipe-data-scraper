import { test, describe, before, after, mock } from 'node:test';
import assert from 'node:assert';
import { MATCH_HTML_TAGS, MATCH_LINE_BREAK, MATCH_MULTI_SPACE } from './regex';

describe('cleanString', () => {
  let cleanString: (str: string) => string;
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
    const cleanStringModule = await import('./cleanString');
    cleanString = cleanStringModule.default;
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
      cleanString('some sort of string');
    });

    test('replace should be invoked with the regex patterns', () => {
      // Verify replace was called with correct arguments
      assert.strictEqual(replaceMock.mock.callCount(), 3);
      
      const calls = replaceMock.mock.calls;
      assert.deepStrictEqual(calls[0].arguments, [MATCH_HTML_TAGS, '']);
      assert.deepStrictEqual(calls[1].arguments, [MATCH_LINE_BREAK, ' ']);
      assert.deepStrictEqual(calls[2].arguments, [MATCH_MULTI_SPACE, ' ']);
    });

    test('trim should be invoked once', () => {
      assert.strictEqual(trimMock.mock.callCount(), 1);
    });
  });
}); 