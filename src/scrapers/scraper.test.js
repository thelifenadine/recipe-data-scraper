import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('Scraper class', () => {
  let myClass;
  const chtmlStub = sinon.stub();
  const loggerStub = sinon.stub();

  const testStub = sinon.stub();
  testStub.returns('hello');
  const buildRecipeModelStub = sinon.stub();

  before(() => {
    myClass = proxyquire.noCallThru().load('./Scraper', {
      '../dataTransformers/buildRecipeModel': buildRecipeModelStub,
      '../utils/logger': loggerStub,
    }).default;
  });

  describe('constructor with a valid class', () => {
    let scraper;

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() { }
        findRecipeItem() { }
      }

      scraper = new mockClass(chtmlStub);
    });

    it('should set the initial values', () => {
      scraper.chtml.should.eql(chtmlStub);
      (scraper.meta === null).should.be.true;
      (scraper.recipeItem === null).should.be.true;
    });
  });

  describe('constructor for a class missing testForMetadata', () => {
    let error = '';

    before(async () => {
      class mockClass extends myClass {
        findRecipeItem() { }
      }

      try {
        new mockClass(chtmlStub);
      } catch (e) {
        error = e;
      }
    });

    it('should throw an error', () => {
      error.should.eql({ message: 'testForMetadata function must be implemented by child class' });
    });
  });

  describe('constructor for a class missing findRecipeItem', () => {
    let error = '';

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() { }
      }

      try {
        new mockClass(chtmlStub);
      } catch (e) {
        error = e;
      }
    });

    it('should throw an error', () => {
      error.should.eql({ message: 'findRecipeItem function must be implemented by child class' });
    });
  });

  describe('getRecipe', () => {
    let scraper;

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

      scraper = new mockClass(chtmlStub);
      scraper.getRecipe();
    });

    it('testForMetadata should set the meta', () => {
      scraper.meta.should.eql('something');
    });

    it('findRecipeItem should set the recipeItem', () => {
      scraper.recipeItem.should.eql({ hi: 'food n stuff' });
    });

    it('buildRecipeModel should be invoked', () => {
      sinon.assert.calledOnce(buildRecipeModelStub);
    });
  });

  describe('getRecipe where no meta has been set', () => {
    let scraper;
    let error;

    before(async () => {
      buildRecipeModelStub.reset();
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

      scraper = new mockClass(chtmlStub);

      try {
        scraper.getRecipe();
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
      (scraper.meta === null).should.be.true;
    });

    it('recipeItem should not be set', () => {
      (scraper.recipeItem === null).should.be.true;
    });

    it('buildRecipeModel should not be called', () => {
      sinon.assert.notCalled(buildRecipeModelStub);
    });
  });

  describe('getRecipe where no recipeItem has been set', () => {
    let scraper;
    let error;

    before(async () => {
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

      scraper = new mockClass(chtmlStub);

      try {
        scraper.getRecipe();
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
      scraper.meta.should.eql('something-meta');
    });

    it('recipeItem should not be set', () => {
      (scraper.recipeItem === null).should.be.true;
    });

    it('no recipeItem error should be thrown', () => {
      error.should.eql({
        message: 'found metadata, but no recipe information',
        type: 'tester-2',
      });
    });

    it('buildRecipeModel should not be called', () => {
      sinon.assert.notCalled(buildRecipeModelStub);
    });
  });


  describe('getRecipe when buildRecipeModel throws an exception', () => {
    let scraper;
    let error;

    before(async () => {
      buildRecipeModelStub.reset();
      buildRecipeModelStub.throws('anything');

      class mockClass extends myClass {
        constructor(chtml) {
          super(chtml);
          this.type = 'tester-3';
        }

        testForMetadata() {
          this.meta = 'something-meta-3';
        }

        findRecipeItem() {
          this.recipeItem = {
            chocolate: 'ice cream',
          };
        }
      }

      scraper = new mockClass(chtmlStub);

      try {
        scraper.getRecipe();
      } catch (e) {
        error = e;
      }
    });

    it('meta should be set', () => {
      scraper.meta.should.eql('something-meta-3');
    });

    it('recipeItem should be set', () => {
      scraper.recipeItem.should.eql({
        chocolate: 'ice cream',
      });
    });

    it('buildRecipeModel should be called', () => {
      sinon.assert.calledOnceWithExactly(buildRecipeModelStub, scraper.recipeItem);
    });

    it('recipe mapping error should be thrown', () => {
      error.should.eql({
        message: 'found recipe information, there was a problem with mapping the data',
        type: 'tester-3',
      });
    });

  });

  describe('print()', () => {
    let scraper;

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() {}
        findRecipeItem() {}
      }

      scraper = new mockClass(chtmlStub);
      scraper.recipeItem = {
        name: 'eat my food',
        forget: 'me,'
      };
      scraper.finalRecipe = {
        name: 'eat my food my-name',
      };
      scraper.print();
    });

    it('loggerStub should be invoked with the recipeItem if set', () => {
      sinon.assert.calledWith(loggerStub, scraper.recipeItem);
    });

    it('loggerStub should be invoked with the finalRecipe if set', () => {
      sinon.assert.calledWith(loggerStub, scraper.finalRecipe);
    });
  });

  describe('print() when nothing is set', () => {
    let scraper;

    before(async () => {
      class mockClass extends myClass {
        testForMetadata() {}
        findRecipeItem() {}
      }

      scraper = new mockClass(chtmlStub);
      scraper.recipeItem = null;
      scraper.finalRecipe = null;
      loggerStub.resetHistory();
      scraper.print();
    });

    it('loggerStub should not be invoked ', () => {
      sinon.assert.notCalled(loggerStub);
    });
  });
});
