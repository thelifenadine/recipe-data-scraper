import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();
import { microdataUrls } from '../../scripts/testResponses';

describe('transformIngredients functionality', () => {
  let transformIngredients;
  const loggerStub = sinon.stub();
  const cleanIngredientAmountsStub = sinon.stub();

  before(() => {
    transformIngredients = proxyquire.noCallThru().load('./transformIngredients', {
      '../utils/logger': loggerStub,
      '../utils/cleanIngredientAmounts': cleanIngredientAmountsStub,
    }).default;
  });

  describe('expected behavior when passed an array of strings', () => {
    let result;

    before(() => {
      cleanIngredientAmountsStub
        .withArgs('1 cup pasta')
        .returns('cleaned 1 cup pasta')
        .withArgs('three teaspoons vanilla')
        .returns('cleaned three teaspoons vanilla')
        .withArgs('1/4 tsp salt')
        .returns('cleaned 1/4 tsp salt');

      result = transformIngredients([
        '1 cup pasta',
        'three teaspoons vanilla',
        '1/4 tsp salt',
      ]);
    });

    it('should invoke cleanIngredientAmounts with each item', () => {
      sinon.assert.calledThrice(cleanIngredientAmountsStub);
    });

    it('the argument should be returned as is', () => {
      result.should.eql(['cleaned 1 cup pasta', 'cleaned three teaspoons vanilla', 'cleaned 1/4 tsp salt']);
    });
  });

  describe('expected behavior when passed an array of objects containing properties key', () => {
    let result;

    before(() => {
      cleanIngredientAmountsStub.reset();

      cleanIngredientAmountsStub
        .withArgs('1 lb pasta')
        .returns('cleaned 1 lb pasta')
        .withArgs('2 cups ice cream')
        .returns('cleaned 2 cups ice cream');

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
      }];

      result = transformIngredients(microdataExample);
    });

    it('should invoke cleanIngredientAmounts with each item', () => {
      sinon.assert.calledTwice(cleanIngredientAmountsStub);
    });

    it('the argument should be returned as an array of strings', () => {
      result.should.eql(['cleaned 1 lb pasta', 'cleaned 2 cups ice cream']);
    });
  });

  describe('expected behavior when passed an array of objects without properties key', () => {
    let result;

    before(() => {
      cleanIngredientAmountsStub.reset();
      const microdataExample = [{
        notProperties: {
          name: ['pasta'],
          amount: ['1 lb'],
        },
      }, {
        notProperties: {
          name: ['ice cream'],
          amount: ['2 cups'],
        },
      }];

      result = transformIngredients(microdataExample);
    });

    it('should not invoke cleanIngredientAmounts', () => {
      sinon.assert.notCalled(cleanIngredientAmountsStub);
    });

    it('the argument should be returned as an empty array', () => {
      result.should.eql([]);
    });
  });
});

describe.skip('transformIngredients end to end', () => {
  let transformIngredients;

  before(() => {
    transformIngredients = proxyquire.noCallThru().load('./transformIngredients', {
    }).default;
  });

  describe('smittenkitchen microdata', () => {
    const expectedResult = ['3 large ears sweet corn, shucked',
      '12 ripe cherry tomatoes, cut into 1/8-inch-thick slices',
      '1/2 cup finely diced red onion',
      '1/2 cup finely diced green bell pepper',
      '2 tablespoons minced jalapeno',
      '2 garlic cloves, ends cut off',
      '3/4 cup unseasoned rice vinegar',
      '1/4 cup raw cane sugar (see Note)',
      '1 tablespoon brown mustard seeds',
      '2 teaspoons cumin seeds',
      '1 teaspoon kosher salt',
      '1/2 teaspoon whole black peppercorns',
      '1/4 teaspoon ground turmeric',
      '2 1/4 teaspoons kosher salt, plus more as needed',
      '1 pound fresh spring peas in their pods (or about 1 to 1 1/4 cup frozen)',
      '1/2 teaspoon minced, seeded, minced jalapeño',
      '1/4 teaspoon fresh lemon juice, plus more as needed',
      'Freshly ground white pepper',
      '16 small new potatoes (a little larger than a walnut is what Terry recommends)',
      '1/2 cup peanut or a vegetable oil',
      '2 large yellow onions, cut into 1/2-inch-thick slices',
      'Kosher salt',
      'Freshly ground black pepper',
      'Sweet Corn Relish, for serving',
      'Spicy Spring Green Pea Sauce, for serving'];
    let result;

    before(() => {
      result = transformIngredients(microdataUrls.smittenkitchen.fullResponse.items[0].properties.recipeIngredient);
    });

    it('should return 25 items', () => {
      result.length.should.eql(25);
    });

    it('should return the expected result', () => {
      result.should.eql(expectedResult);
    });
  });
});
