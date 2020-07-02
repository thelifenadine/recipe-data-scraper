import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('transformIngredients', () => {
  let transformIngredients;
  const loggerStub = sinon.stub();

  before(() => {
    transformIngredients = proxyquire.noCallThru().load('./transformIngredients', {
      '../logger': loggerStub,
    }).default;
  });

  describe('expected behavior when passed an array of strings', () => {
    let result;

    before(() => {
      result = transformIngredients([
        '1 cup pasta',
        'three teaspoons vanilla',
        '¼ tsp salt',
      ]);
    });

    it('the argument should be returned as is', () => {
      result.should.eql(['1 cup pasta', 'three teaspoons vanilla', '1/4 tsp salt']);
    });
  });

  describe('expected behavior when passed an array of objects', () => {
    let result;

    before(() => {
      const microdataExample = [{
        properties: {
          name: ['pasta'],
          amount: ['1 lb'],
        },
      }, {
        properties: {
          name: ['ice cream'],
          amount: ['2 cups'],
        },
      }, {
        properties: {
          name: ['butter'],
          amount: ['½ cup'],
        },
      }];

      result = transformIngredients(microdataExample);
    });

    it('the argument should be returned as an array of strings', () => {
      result.should.eql(['1 lb pasta', '2 cups ice cream', '1/2 cup butter']);
    });
  });
});
