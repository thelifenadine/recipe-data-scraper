import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('cleanIngredientAmounts', () => {
  let cleanIngredientAmounts;

  before(() => {
    cleanIngredientAmounts = proxyquire.noCallThru().load('./cleanIngredientAmounts', {
      './cleanHtml': sinon.stub(),
    }).default;
  });

  describe('expected behavior', () => {
    it('¼ should be replaced with 1/4', () => {
      cleanIngredientAmounts('¼ tsp salt').should.eql('1/4 tsp salt');
    });

    it('¾ should be replaced with 3/4', () => {
      cleanIngredientAmounts('¾ cup').should.eql('3/4 cup');
    });

    it('½ should be replaced with 1/2', () => {
      cleanIngredientAmounts('½ TBSP').should.eql('1/2 TBSP');
    });
  });
});
