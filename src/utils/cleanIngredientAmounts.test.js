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

    it('⅔ should be replaced with 2/3', () => {
      cleanIngredientAmounts('⅔ cups').should.eql('2/3 cups');
    });

    it('should remove multiple spaces', () => {
      cleanIngredientAmounts('3/4  teaspoon    crushed red pepper flakes')
        .should.eql('3/4 teaspoon crushed red pepper flakes');
    });

    it('should remove html', () => {
      cleanIngredientAmounts('1 cup (120g) <a href="https://shop.kingarthurbaking.com/items/king-arthur-unbleached-all-purpose-flour-3-lb" target="_blank" data-name="King Arthur Unbleached All-Purpose Flour - 3 lb." data-sku="211102" data-price="$2.99">King Arthur Unbleached All-Purpose Flour</a>')
        .should.eql('1 cup (120g) King Arthur Unbleached All-Purpose Flour');
    });
  });
});
