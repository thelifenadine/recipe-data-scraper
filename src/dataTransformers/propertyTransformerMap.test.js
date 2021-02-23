import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('propertyTransformerMap', () => {
  const transformImageStub = sinon.stub();
  const transformToListStub = sinon.stub();
  const transformToStringStub = sinon.stub();
  const transformToTimeStub = sinon.stub();
  const transformToCleanStringStub = sinon.stub();
  const transformInstructionsStub = sinon.stub();
  const transformIngredientsStub = sinon.stub();

  let propertyTransformerMap;

  before(() => {
    propertyTransformerMap = proxyquire.noCallThru().load('./propertyTransformerMap', {
      './transformImage': transformImageStub,
      './transformToList': transformToListStub,
      './transformToTime': transformToTimeStub,
      './transformToString': transformToStringStub,
      './transformToCleanString': transformToCleanStringStub,
      './transformInstructions': transformInstructionsStub,
      './transformIngredients': transformIngredientsStub,
    }).default;
  });

  describe('expected behavior', () => {
    it('the name key should map to the string transformer', () => {
      propertyTransformerMap['name'].should.eql(transformToStringStub);
    });

    it('the image key should map to the image transformer', () => {
      propertyTransformerMap['image'].should.eql(transformImageStub);
    });

    it('the description key should map to the string transformer', () => {
      propertyTransformerMap['description'].should.eql(transformToCleanStringStub);
    });

    it('the cookTimeOriginalFormat key should map to the string transformer', () => {
      propertyTransformerMap['cookTimeOriginalFormat'].should.eql(transformToStringStub);
    });

    it('the prepTimeOriginalFormat key should map to the string transformer', () => {
      propertyTransformerMap['prepTimeOriginalFormat'].should.eql(transformToStringStub);
    });

    it('the totalTimeOriginalFormat key should map to the string transformer', () => {
      propertyTransformerMap['totalTimeOriginalFormat'].should.eql(transformToStringStub);
    });

    it('the cookTime key should map to the time transformer', () => {
      propertyTransformerMap['cookTime'].should.eql(transformToTimeStub);
    });

    it('the prepTime key should map to the time transformer', () => {
      propertyTransformerMap['prepTime'].should.eql(transformToTimeStub);
    });

    it('the totalTime key should map to the time transformer', () => {
      propertyTransformerMap['totalTime'].should.eql(transformToTimeStub);
    });

    it('the recipeYield key should map to the string transformer', () => {
      propertyTransformerMap['recipeYield'].should.eql(transformToStringStub);
    });

    it('the recipeIngredients key should map to the ingredients transformer', () => {
      propertyTransformerMap['recipeIngredients'].should.eql(transformIngredientsStub);
    });

    it('the recipeInstructions key should map to the instructions transformer', () => {
      propertyTransformerMap['recipeInstructions'].should.eql(transformInstructionsStub);
    });

    it('the recipeCategories key should map to the kust transformer', () => {
      propertyTransformerMap['recipeCategories'].should.eql(transformToListStub);
    });

    it('the recipeCuisines key should map to the kust transformer', () => {
      propertyTransformerMap['recipeCuisines'].should.eql(transformToListStub);
    });

    it('the recipeTypes key should map to the kust transformer', () => {
      propertyTransformerMap['recipeTypes'].should.eql(transformToListStub);
    });

    it('the keywords key should map to the kust transformer', () => {
      propertyTransformerMap['keywords'].should.eql(transformToListStub);
    });
  });
});
