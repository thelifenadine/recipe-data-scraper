import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { should } from "chai";
should();
import { MATCH_HTML_TAGS, MATCH_LINE_BREAK, MATCH_MULTI_SPACE } from './regex';

describe('cleanString', () => {
  let cleanString;
  let replaceSpy;
  let trimSpy;

  before(() => {
    replaceSpy = sinon.spy(String.prototype, 'replace');
    trimSpy = sinon.spy(String.prototype, 'trim');
    cleanString = proxyquire.noCallThru().load('./cleanString', {}).default;
  });

  after(() => {
    replaceSpy.restore();
    trimSpy.restore();
  });

  describe('expected behavior', () => {
    before(() => {
      trimSpy.resetHistory();
      replaceSpy.resetHistory();
      cleanString('some sort of string');
    });

    it('replace should be invoked with the regex patterns', () => {
      sinon.assert.calledWith(replaceSpy, MATCH_HTML_TAGS, '');
      sinon.assert.calledWith(replaceSpy, MATCH_LINE_BREAK, ' ');
      sinon.assert.calledWith(replaceSpy, MATCH_MULTI_SPACE, ' ');
      sinon.assert.calledThrice(replaceSpy);
    });

    it('trim should be invoked once', () => {
      sinon.assert.calledOnce(trimSpy);
    });
  });
});
