import { test, describe, before, after, mock } from 'node:test';
import assert from 'node:assert';

const originalConsoleLog = global.console.log;
const originalEnvLoggingEnabled = process.env.LOGGING_ENABLED;

describe('logger', () => {
  let logger: (...args: any[]) => void;
  const logMock = mock.fn();

  before(() => {
    // Mock console.log
    global.console.log = logMock;
  });

  after(() => {
    // Restore original values
    global.console.log = originalConsoleLog;
    process.env.LOGGING_ENABLED = originalEnvLoggingEnabled;
    mock.restoreAll();
  });

  describe('expected behavior when passed a string', () => {
    before(async () => {
      process.env.LOGGING_ENABLED = 'true';
      // Dynamic import to get fresh module
      delete require.cache[require.resolve('./logger')];
      const loggerModule = await import('./logger');
      logger = loggerModule.default;
      logger('test');
    });

    test('error should be logged', () => {
      assert.strictEqual(logMock.mock.callCount(), 1);
      assert.deepStrictEqual(logMock.mock.calls[0].arguments, ['test']);
    });
  });

  describe('expected behavior when passed multiple arguments', () => {
    before(async () => {
      logMock.mock.resetCalls();
      process.env.LOGGING_ENABLED = 'true';
      // Dynamic import to get fresh module
      delete require.cache[require.resolve('./logger')];
      const loggerModule = await import('./logger');
      logger = loggerModule.default;
      logger('test', { hey: 'ho' });
    });

    test('error should be logged', () => {
      assert.strictEqual(logMock.mock.callCount(), 1);
      assert.deepStrictEqual(logMock.mock.calls[0].arguments, ['test', { hey: 'ho' }]);
    });
  });

  describe('expected behavior when logging is not enabled', () => {
    before(async () => {
      logMock.mock.resetCalls();
      process.env.LOGGING_ENABLED = 'false';
      // Dynamic import to get fresh module
      delete require.cache[require.resolve('./logger')];
      const loggerModule = await import('./logger');
      logger = loggerModule.default;
      logger('test');
    });

    test('error should not be logged', () => {
      assert.strictEqual(logMock.mock.callCount(), 0);
    });
  });
}); 