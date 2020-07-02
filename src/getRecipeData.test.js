import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

const loggerStub = sinon.stub();

class mockClass {
  constructor(chtml) {
    this.chtml = chtml;
  }
  getRecipe() {
    return 'test';
  }
}

class mockClassWithError {
  constructor(chtml) {
    this.chtml = chtml;
  }
  getRecipe() {
    throw { error: 'my-error' };
  }
}

describe('getRecipeData class', () => {
  let getRecipeData;

  before(() => {
    getRecipeData = proxyquire.noCallThru().load('./getRecipeData', {
      './logger': loggerStub,
    }).default;
  });

  describe('expected behavior', () => {
    let result;
    const testChtml = 'whateeeever';
    const testUrl = 'test-url.com';

    before(() => {
      result = getRecipeData(mockClass, testChtml, testUrl);
    });

    it('result should equal value returned by getRecipe()', () => {
      result.should.eql('test');
    });
  });

  describe('when error is thrown by .getRecipe', () => {
    let result;
    const testChtml = 'whateeeever';
    const testUrl = 'test-url.com';

    before(() => {
      result = getRecipeData(mockClassWithError, testChtml, testUrl);
    });

    it('error should be logged', () => {
      sinon.assert.calledWith(loggerStub, 'getRecipeData', { error: 'my-error', url: testUrl });
    });

    it('result should be null', () => {
      (result === null).should.be.true;
    });
  });
});
