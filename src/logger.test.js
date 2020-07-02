import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

const original = global.console.log;

describe('logger', () => {
  let logger;
  const logStub = sinon.stub();

  before(() => {
    global.console.log = logStub;
    logger = proxyquire.noCallThru().load('./logger', {}).default;
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
});
