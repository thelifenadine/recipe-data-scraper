import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('buildRecipeModel', () => {
  let buildRecipeModel;

  const consolidateRecipePropertiesStub = sinon.stub();

  consolidateRecipePropertiesStub.returns({
    url: 'test_url',
    name: 'test_name',
    image: 'test_image',
    description: 'test_description', // string
    cookTime: 'test_cookTime', // string
    prepTime: 'test_prepTime', // string
    totalTime: 'test_totalTime', // string
    recipeYield: 'test_recipeYield',// string
    recipeIngredients: ['ing, red, ient'], // array
    recipeInstructions: ['step1, step2'], // array
    recipeCategories: ['cat1, cat2, cat3, cat4'], // array
    recipeCuisines: ['italian'], // array
    recipeTypes: ['dinner'], // array
    keywords: ['easy', 'banana'], // array
  });

  const propertyTransformerMapStub = {
    name: sinon.stub(),
    image: sinon.stub(),
    description: sinon.stub(),
    nope: sinon.stub(),
  };

  before(() => {
    buildRecipeModel = proxyquire.noCallThru().load('./buildRecipeModel', {
      './consolidateRecipeProperties': consolidateRecipePropertiesStub,
      './propertyTransformerMap': propertyTransformerMapStub,
    }).default;
  });

  describe('each property should invoke its transformer if it exists', () => {
    const prospectiveProperties = {
      url: 'test_url',
      name: 'test_name',
      image: 'test_image',
      description: 'test_description',
      nope: undefined,
    };

    before(() => {
      buildRecipeModel(prospectiveProperties);
    });

    it('name', () => {
      sinon.assert.calledOnceWithExactly(propertyTransformerMapStub.name, 'test_name', 'name');
    });

    it('image', () => {
      sinon.assert.calledOnceWithExactly(propertyTransformerMapStub.image, 'test_image', 'image');
    });

    it('description', () => {
      sinon.assert.calledOnceWithExactly(propertyTransformerMapStub.description, 'test_description', 'description');
    });

    it('property without a value', () => {
      sinon.assert.notCalled(propertyTransformerMapStub.nope);
    });
  });
});
