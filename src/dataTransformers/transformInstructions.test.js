import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('transformInstructions', () => {
  let transformInstructions;
  const loggerStub = sinon.stub();

  before(() => {
    transformInstructions = proxyquire.noCallThru().load('./transformInstructions', {
      '../logger': loggerStub,
    }).default;
  });

  describe('expected behavior when passed a string', () => {
    let result;

    before(() => {
      result = transformInstructions('test');
    });

    it('the param should be returned in an array', () => {
      result.should.eql(['test']);
    });
  });

  describe('expected behavior when passed an array of strings', () => {
    let result;

    before(() => {
      result = transformInstructions(['test-1', 'yo']);
    });

    it('the argument should be returned as is', () => {
      result.should.eql(['test-1', 'yo']);
    });
  });

  describe('expected behavior when passed an array of objects', () => {
    let result;

    before(() => {
      result = transformInstructions([{ text: 'test-1' }, { text: 'yo' }]);
    });

    it('the argument should be returned as an array of strings', () => {
      result.should.eql(['test-1', 'yo']);
    });
  });
});
