import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('transformToCleanString', () => {
  let transformToCleanString;
  const cleanStringStub = sinon.stub();
  const transformToStringStub = sinon.stub();

  before(() => {
    transformToCleanString = proxyquire.noCallThru().load('./transformToCleanString', {
      '../utils/cleanString': cleanStringStub,
      './transformToString': transformToStringStub,
    }).default;
  });

  describe('expected behavior when invoked', () => {
    before(() => {
      transformToStringStub.returns('the-string-itself');
      transformToCleanString('some-value', 'some-key');
    });

    it('transformToString should be invoked with the value and key', () => {
      sinon.assert.calledWithExactly(transformToStringStub, 'some-value', 'some-key');
    });

    it('cleanString should be invoked with the result of transformToString', () => {
      sinon.assert.calledWithExactly(cleanStringStub, 'the-string-itself');
    });
  });
});
