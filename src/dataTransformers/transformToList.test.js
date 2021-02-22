import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('transformToList', () => {
  let transformToList;
  const loggerStub = sinon.stub();

  before(() => {
    transformToList = proxyquire.noCallThru().load('./transformToList', {
      '../utils/logger': loggerStub,
    }).default;
  });

  describe('expected behavior when passed a simple string', () => {
    let result;

    before(() => {
      result = transformToList('test of something simple');
    });

    it('the param should be returned in an array', () => {
      result.should.eql(['test of something simple']);
    });
  });

  describe('expected behavior when passed a comma separated string', () => {
    let result;

    before(() => {
      result = transformToList('test, of something, simple');
    });

    it('the param should be returned in an array', () => {
      result.should.eql(['test', 'of something', 'simple']);
    });
  });
  describe('expected behavior when passed an array', () => {
    let result;

    before(() => {
      result = transformToList(['test-1', 'yo']);
    });

    it('the argument should be returned as is', () => {
      result.should.eql(['test-1', 'yo']);
    });
  });

  describe('expected behavior when something unexpected is passed', () => {
    let result;

    before(() => {
      loggerStub.resetHistory();
      result = transformToList({ nope: 'nope.com' });
    });

    it('loggerStub should be invoked', () => {
      sinon.assert.calledOnce(loggerStub);
    });

    it('the param passed in should be returned', () => {
      result.should.eql({ nope: 'nope.com' });
    });
  });
});
