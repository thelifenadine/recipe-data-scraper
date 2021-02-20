import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('transformToString', () => {
  let transformToString;
  const loggerStub = sinon.stub();

  before(() => {
    transformToString = proxyquire.noCallThru().load('./transformToString', {
      '../utils/logger': loggerStub,
    }).default;
  });

  describe('expected behavior when passed a string', () => {
    let result;

    before(() => {
      result = transformToString('test');
    });

    it('the param should be passed as is', () => {
      result.should.eql('test');
    });
  });

  describe('expected behavior when passed an array', () => {
    let result;

    before(() => {
      result = transformToString(['test-1', 'yo']);
    });

    it('the string at index 0 should be returned', () => {
      result.should.eql('test-1');
    });
  });

  describe('expected behavior when something unexpected is passed', () => {
    let result;

    before(() => {
      loggerStub.resetHistory();
      result = transformToString({ nope: 'nope.com' });
    });

    it('loggerStub should be invoked', () => {
      sinon.assert.calledOnce(loggerStub);
    });

    it('the param passed in should be returned', () => {
      result.should.eql({ nope: 'nope.com' });
    });
  });
});
