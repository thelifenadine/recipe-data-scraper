import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

const originalConsoleLog = global.console.log;
const originalEnvLoggingEnabled = process.env.LOGGING_ENABLED;

describe('logger', () => {
  let logger;
  const logStub = sinon.stub();
  let initLogger;

  before(() => {
    global.console.log = logStub;

    initLogger = (isLoggingEnabled) => {
      process.env.LOGGING_ENABLED = isLoggingEnabled;
      return proxyquire.noCallThru().load('./logger', {}).default;
    };
  });

  after(() => {
    global.console.log = originalConsoleLog;
    process.env.LOGGING_ENABLED = originalEnvLoggingEnabled;
  });

  describe('expected behavior when passed a string', () => {
    before(() => {
      logger = initLogger('true');
      logger('test');
    });

    it('error should be logged', () => {
      sinon.assert.calledWith(logStub, 'test');
    });
  });

  describe('expected behavior when passed multiple arguments', () => {
    before(() => {
      logger = initLogger('true');
      logger('test', { hey: 'ho' });
    });

    it('error should be logged', () => {
      sinon.assert.calledWith(logStub, 'test', { hey: 'ho' });
    });
  });

  describe('expected behavior when logging is not enabled', () => {
    before(() => {
      logStub.reset();
      logger = initLogger();
      logger('test');
    });

    it('error should not be logged', () => {
      sinon.assert.notCalled(logStub);
    });
  });
});
