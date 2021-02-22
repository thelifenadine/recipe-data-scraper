import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('main(url)', () => {
  let recipeDataScraper;
  const loggerStub = sinon.stub();
  const axiosStub = sinon.stub();
  const cheerioStub = {
    load: sinon.stub(),
  };
  const getRecipeJsonLdStub = sinon.stub();
  const getRecipeMicrodataStub = sinon.stub();
  const printJsonLdStub = sinon.stub();
  const printMicrodataStub = sinon.stub();

  class MicrodataScraperClass {
    constructor(chtml) {
      this.chtml = chtml;
    }
    getRecipe = getRecipeMicrodataStub
    print = printMicrodataStub
  }

  class JsonLdScraperClass {
    constructor(chtml) {
      this.chtml = chtml;
    }
    getRecipe = getRecipeJsonLdStub
    print = printJsonLdStub
  }

  before(() => {
    recipeDataScraper = proxyquire.noCallThru().load('./main', {
      'axios': axiosStub,
      'cheerio': cheerioStub,
      './scrapers/JsonLdScraper': JsonLdScraperClass,
      './scrapers/MicrodataScraper': MicrodataScraperClass,
      './utils/logger': loggerStub,
    }).default;
  });

  describe('test expected behavior when the axios call fails', () => {
    let errorMessage;
    const testUrl = 'https://someurl.test3';

    before(async () => {
      axiosStub.withArgs(testUrl).throws();
      cheerioStub.load.reset();

      try {
        await recipeDataScraper(testUrl);
      } catch (error) {
        errorMessage = error.message;
      }
    });

    it('axios was invoked with the url', () => {
      sinon.assert.calledWith(axiosStub, testUrl);
    });

    it('cheerio.load will not be invoked', () => {
      sinon.assert.notCalled(cheerioStub.load);
    });

    it('getRecipe for the JsonLd instance will not be invoked', () => {
      sinon.assert.notCalled(getRecipeJsonLdStub);
    });

    it('getRecipe for the microdata instance will not be invoked', () => {
      sinon.assert.notCalled(getRecipeMicrodataStub);
    });

    it('error should be caught with correct message', () => {
      errorMessage.should.eql('Could not find recipe data');
    });
  });

  describe('test expected behavior when cheerio.load fails', () => {
    let errorMessage;
    const testUrl = 'https://someurl.test3';
    const mockAxiosResp = { data: '<some html />' };

    before(async () => {
      axiosStub.reset();
      axiosStub.withArgs(testUrl).returns(mockAxiosResp);
      cheerioStub.load.reset();
      cheerioStub.load.throws();

      try {
        await recipeDataScraper(testUrl);
      } catch (error) {
        errorMessage = error.message;
      }
    });

    it('axios was invoked with the url', () => {
      sinon.assert.calledWith(axiosStub, testUrl);
    });

    it('cheerio.load was invoked with the response', () => {
      sinon.assert.calledWith(cheerioStub.load, mockAxiosResp.data);
    });

    it('getRecipe for the JsonLd instance will not be invoked', () => {
      sinon.assert.notCalled(getRecipeJsonLdStub);
    });

    it('getRecipe for the microdata instance will not be invoked', () => {
      sinon.assert.notCalled(getRecipeMicrodataStub);
    });

    it('error should be caught with correct message', () => {
      errorMessage.should.eql('Could not find recipe data');
    });
  });

  describe('test expected behavior when json-ld is returned', () => {
    let result;
    const testUrl = 'https://someurl.test';
    const mockAxiosResp = { data: '<some html />' };
    const mockChtmlResp = { some: 'response' };
    const mockRecipeJsonLd = { has: 'json-ld' };

    before(async () => {
      axiosStub.withArgs(testUrl).returns(mockAxiosResp);
      cheerioStub.load.returns(mockChtmlResp);
      getRecipeJsonLdStub.withArgs().returns(mockRecipeJsonLd);
      result = await recipeDataScraper(testUrl);
    });

    it('axios was invoked with the url', () => {
      sinon.assert.calledWith(axiosStub, testUrl);
    });

    it('cheerio.load was invoked with the response', () => {
      sinon.assert.calledWith(cheerioStub.load, mockAxiosResp.data);
    });

    it('getRecipe should be invoked on the JsonLd instance', () => {
      sinon.assert.calledWith(getRecipeJsonLdStub);
    });

    it('getRecipe should NOT be invoked with the microdata', () => {
      sinon.assert.neverCalledWithMatch(getRecipeMicrodataStub);
    });

    it('print should not be invoked', () => {
      sinon.assert.neverCalledWithMatch(printJsonLdStub);
    });

    it('logger should not be invoked', () => {
      sinon.assert.neverCalledWithMatch(loggerStub);
    });

    it('result should equal json-ld response', () => {
      result.should.eql({ ...mockRecipeJsonLd, url: testUrl });
    });
  });

  describe('test expected behavior when json-ld is returned and print is enabled', () => {
    let result;
    const testUrl = 'https://someurl.test';
    const mockAxiosResp = { data: '<some html />' };
    const mockChtmlResp = { some: 'response' };
    const mockRecipeJsonLd = { has: 'json-ld' };

    before(async () => {
      printJsonLdStub.reset();
      axiosStub.withArgs(testUrl).returns(mockAxiosResp);
      cheerioStub.load.returns(mockChtmlResp);
      getRecipeJsonLdStub.withArgs().returns(mockRecipeJsonLd);
      result = await recipeDataScraper(testUrl, { printToConsole: true });
    });

    it('axios was invoked with the url', () => {
      sinon.assert.calledWith(axiosStub, testUrl);
    });

    it('cheerio.load was invoked with the response', () => {
      sinon.assert.calledWith(cheerioStub.load, mockAxiosResp.data);
    });

    it('getRecipe should be invoked on the JsonLd instance', () => {
      sinon.assert.calledWith(getRecipeJsonLdStub);
    });

    it('getRecipe should NOT be invoked with the microdata', () => {
      sinon.assert.neverCalledWithMatch(getRecipeMicrodataStub);
    });

    it('print should be invoked', () => {
      sinon.assert.calledOnce(printJsonLdStub);
    });

    it('logger should not be invoked', () => {
      sinon.assert.neverCalledWithMatch(loggerStub);
    });

    it('result should equal json-ld response', () => {
      result.should.eql({ ...mockRecipeJsonLd, url: testUrl });
    });
  });

  describe('test expected behavior when microdata is returned', () => {
    let result;
    const testUrl = 'https://someurl.test2';
    const mockAxiosResp = { data: '<some html />' };
    const mockChtmlResp = { some: 'response' };
    const mockRecipeMicrodata = { has: 'microdata' };

    before(async () => {
      loggerStub.reset();
      axiosStub.withArgs(testUrl).returns(mockAxiosResp);
      cheerioStub.load.returns(mockChtmlResp);
      getRecipeJsonLdStub.reset();
      getRecipeJsonLdStub.throws({ message: 'well well'});
      getRecipeMicrodataStub.withArgs().returns(mockRecipeMicrodata);
      result = await recipeDataScraper(testUrl);
    });

    it('axios was invoked with the url', () => {
      sinon.assert.calledWith(axiosStub, testUrl);
    });

    it('cheerio.load was invoked with the response', () => {
      sinon.assert.calledWith(cheerioStub.load, mockAxiosResp.data);
    });

    it('logger should be invoked with json ld error', () => {
      sinon.assert.calledWith(loggerStub, 'main:JsonLdScraper');
    });

    it('getRecipe was invoked with the class, etc', () => {
      sinon.assert.calledWith(getRecipeMicrodataStub);
    });

    it('print should not be invoked', () => {
      sinon.assert.neverCalledWithMatch(printMicrodataStub);
    });

    it('result should equal microdata response and the url', () => {
      result.should.eql({ ...mockRecipeMicrodata, url: testUrl });
    });
  });

  describe('test expected behavior when microdata is returned and print is enabled', () => {
    let result;
    const testUrl = 'https://someurl.test2';
    const mockAxiosResp = { data: '<some html />' };
    const mockChtmlResp = { some: 'response' };
    const mockRecipeMicrodata = { has: 'microdata' };

    before(async () => {
      printMicrodataStub.reset();
      loggerStub.reset();
      axiosStub.withArgs(testUrl).returns(mockAxiosResp);
      cheerioStub.load.returns(mockChtmlResp);
      getRecipeJsonLdStub.reset();
      getRecipeJsonLdStub.throws({ message: 'well well' });
      getRecipeMicrodataStub.withArgs().returns(mockRecipeMicrodata);
      result = await recipeDataScraper(testUrl, { printToConsole: true });
    });

    it('axios was invoked with the url', () => {
      sinon.assert.calledWith(axiosStub, testUrl);
    });

    it('cheerio.load was invoked with the response', () => {
      sinon.assert.calledWith(cheerioStub.load, mockAxiosResp.data);
    });

    it('logger should be invoked with json ld error', () => {
      sinon.assert.calledWith(loggerStub, 'main:JsonLdScraper');
    });

    it('getRecipe was invoked with the class, etc', () => {
      sinon.assert.calledWith(getRecipeMicrodataStub);
    });

    it('print should be invoked', () => {
      sinon.assert.calledOnce(printMicrodataStub);
    });

    it('result should equal microdata response and the url', () => {
      result.should.eql({ ...mockRecipeMicrodata, url: testUrl });
    });
  });

  describe('test expected behavior when no recipe data is found', () => {
    let errorMessage;
    const testUrl = 'https://someurl.test2';
    const mockAxiosResp = { data: '<some html />' };
    const mockChtmlResp = { some: 'response' };

    before(async () => {
      loggerStub.reset();
      axiosStub.withArgs(testUrl).returns(mockAxiosResp);
      cheerioStub.load.returns(mockChtmlResp);
      getRecipeJsonLdStub.reset();
      getRecipeJsonLdStub.throws({ message: 'well well' });
      getRecipeMicrodataStub.reset();
      getRecipeMicrodataStub.throws({ message: 'no recipe here' });

      try {
        await recipeDataScraper(testUrl);
      } catch (error) {
        errorMessage = error.message;
      }
    });

    it('axios was invoked with the url', () => {
      sinon.assert.calledWith(axiosStub, testUrl);
    });

    it('cheerio.load was invoked with the response', () => {
      sinon.assert.calledWith(cheerioStub.load, mockAxiosResp.data);
    });

    it('getRecipe was invoked on the JsonLdScraper class', () => {
      sinon.assert.calledWith(getRecipeJsonLdStub);
    });

    it('getRecipe was invoked on the MicrodataScraper class', () => {
      sinon.assert.calledWith(getRecipeMicrodataStub);
    });

    it('logger should be invoked with json ld error', () => {
      sinon.assert.callCount(loggerStub, 2);
    });

    it('logger should be invoked with jsonLd error', () => {
      sinon.assert.calledWith(loggerStub.getCall(0), 'main:JsonLdScraper', { message: "well well", url: "https://someurl.test2" });
    });

    it('logger should be invoked with microdata error', () => {
      sinon.assert.calledWith(loggerStub.getCall(1), 'main:MicrodataScraper', { message: "no recipe here", url: "https://someurl.test2" });
    });

    it('error should be caught with correct message', () => {
      errorMessage.should.eql('Could not find recipe data');
    });
  });
});
