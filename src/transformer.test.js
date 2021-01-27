import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

const propertyMapperMock = {
  name: (value) => (`${value} my-name`),
  photo: (value) => (`${value} photo-value`),
};

describe('Transformer class', () => {
  let myClass;
  const chtmlStub = sinon.stub();
  const loggerStub = sinon.stub();

  const testStub = sinon.stub();
  testStub.returns('hello');
  let transformToFinalModelSpy;

  before(() => {
    myClass = proxyquire.noCallThru().load('./Transformer', {
      './recipeModelBuilder': (param) => param,
      './propertyMapper': propertyMapperMock,
      './logger': loggerStub,
    }).default;

    transformToFinalModelSpy = sinon.spy(myClass.prototype, 'transformToFinalModel');
  });

  describe('constructor', () => {
    let transformer;

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() {}
        findRecipeItem() {}
      }

      transformer = new mockClass(chtmlStub);
    });

    it('should set the initial values', () => {
      transformer.chtml.should.eql(chtmlStub);
      (transformer.meta === null).should.be.true;
      (transformer.recipeItem === null).should.be.true;
    });
  });

  describe('getRecipe', () => {
    let transformer;

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() {
          this.meta = 'something';
        }

        findRecipeItem() {
          this.recipeItem = {
            hi: 'food n stuff',
          };
        }
      }

      transformer = new mockClass(chtmlStub);
      transformer.getRecipe();
    });

    it('testForMetadata should set the meta', () => {
      transformer.meta.should.eql('something');
    });

    it('findRecipeItem should set the recipeItem', () => {
      transformer.recipeItem.should.eql({ hi: 'food n stuff' });
    });

    it('transformToFinalModelSpy should be invoked', () => {
      sinon.assert.calledOnce(transformToFinalModelSpy);
    });
  });

  describe('transformToFinalModel', () => {
    let transformer;

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() {}

        findRecipeItem() {}
      }

      transformer = new mockClass(chtmlStub);
      transformer.recipeItem = {
        name: 'eat my food',
        photo: 'take my pic',
        forget: 'me,'
      };
      transformer.transformToFinalModel();
    });

    it('finalRecipe should be mapped from the recipeItem', () => {
      transformer.finalRecipe.should.eql({
        name: 'eat my food my-name',
        photo: 'take my pic photo-value',
      });
    });
  });

  describe('getRecipe where no meta has been set', () => {
    let transformer;
    let error;

    before(async () => {
      transformToFinalModelSpy.resetHistory();
      class mockClass extends myClass {
        constructor(chtml) {
          super(chtml);
          this.type = 'tester';
        }

        testForMetadata() {
          // this.meta is null
        }

        findRecipeItem() {
          this.recipeItem = {
            hi: 'food n stuff',
          };
        }
      }

      transformer = new mockClass(chtmlStub);

      try {
        transformer.getRecipe();
      } catch (e) {
        error = e;
      }
    });

    it('no meta error should be thrown', () => {
      error.should.eql({
        message: 'no meta data was found',
        type: 'tester',
      });
    });

    it('meta should not be set', () => {
      (transformer.meta === null).should.be.true;
    });

    it('recipeItem should not be set', () => {
      (transformer.recipeItem === null).should.be.true;
    });

    it('transformToFinalModelSpy should not be called', () => {
      sinon.assert.notCalled(transformToFinalModelSpy);
    });
  });

  describe('getRecipe where no recipeItem has been set', () => {
    let transformer;
    let error;

    before(async () => {
      transformToFinalModelSpy.resetHistory();
      class mockClass extends myClass {
        constructor(chtml) {
          super(chtml);
          this.type = 'tester-2';
        }

        testForMetadata() {
          this.meta = 'something-meta';
        }

        findRecipeItem() {}
      }

      transformer = new mockClass(chtmlStub);

      try {
        transformer.getRecipe();
      } catch (e) {
        error = e;
      }
    });

    it('no meta error should be thrown', () => {
      error.should.eql({
        message: 'found metadata, but no recipe information',
        type: 'tester-2',
      });
    });

    it('meta should be set', () => {
      transformer.meta.should.eql('something-meta');
    });

    it('recipeItem should not be set', () => {
      (transformer.recipeItem === null).should.be.true;
    });

    it('no recipeItem error should be thrown', () => {
      error.should.eql({
        message: 'found metadata, but no recipe information',
        type: 'tester-2',
      });
    });

    it('transformToFinalModelSpy should not be called', () => {
      sinon.assert.notCalled(transformToFinalModelSpy);
    });
  });

  describe('print()', () => {
    let transformer;

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() {}
        findRecipeItem() {}
      }

      transformer = new mockClass(chtmlStub);
      transformer.recipeItem = {
        name: 'eat my food',
        forget: 'me,'
      };
      transformer.finalRecipe = {
        name: 'eat my food my-name',
      };
      transformer.print();
    });

    it('loggerStub should be invoked with the recipeItem if set', () => {
      sinon.assert.calledWith(loggerStub, transformer.recipeItem);
    });

    it('loggerStub should be invoked with the finalRecipe if set', () => {
      sinon.assert.calledWith(loggerStub, transformer.finalRecipe);
    });
  });

  describe('print() when nothing is set', () => {
    let transformer;

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() {}
        findRecipeItem() {}
      }

      transformer = new mockClass(chtmlStub);
      transformer.recipeItem = null;
      transformer.finalRecipe = null;
      loggerStub.resetHistory();
      transformer.print();
    });

    it('loggerStub should not be invoked ', () => {
      sinon.assert.notCalled(loggerStub);
    });
  });
});
