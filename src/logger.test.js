import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

const original = global.console.log;

describe('logger', () => {
  let logger;
  const logStub = sinon.stub();
  const configMock = {
    loggingEnabled: true,
  }

  before(() => {
    global.console.log = logStub;
    logger = proxyquire.noCallThru().load('./logger', {
      '../config.json': configMock,
    }).default;
  });

  after(() => {
    global.console.log = original;
  });

  describe('expected behavior when passed a string', () => {
    before(() => {
      logger('test');
    });

    it('error should be logged', () => {
      sinon.assert.calledWith(logStub, 'test');
    });
  });

  describe('expected behavior when passed multiple arguments', () => {
    before(() => {
      logger('test', { hey: 'ho' });
    });

    it('error should be logged', () => {
      sinon.assert.calledWith(logStub, 'test', { hey: 'ho' });
    });
  });

  describe('expected behavior when logging is disabled', () => {
    before(() => {
      logStub.reset();
      configMock.loggingEnabled = false,
      logger('test');
    });

    it('error should not be logged', () => {
      sinon.assert.notCalled(logStub);
    });
  });
});
