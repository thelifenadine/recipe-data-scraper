import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('cleanString', () => {
  let cleanString;

  before(() => {
    cleanString = proxyquire.noCallThru().load('./cleanString', {}).default;
  });

  describe('expected behavior when passed a string with no html', () => {
    let result;

    before(() => {
      result = cleanString('test a string with no html');
    });

    it('the param should be passed as is', () => {
      result.should.eql('test a string with no html');
    });
  });

  describe('expected behavior when passed a string with html', () => {
    let result;

    before(() => {
      result = cleanString('<p>test a <a href="go-somewhere">string</a> with</p> html');
    });

    it('the html tags should be removed', () => {
      result.should.eql('test a string with html');
    });
  });

  describe('expected behavior when passed a string with a script', () => {
    let result;

    before(() => {
      result = cleanString('<script>alert("HEY!")</script> cut that out');
    });

    it('the script tags should be removed', () => {
      result.should.eql('alert("HEY!") cut that out');
    });
  });

  describe('expected behavior when passed a string with a &nbsp; character', () => {
    let result;

    before(() => {
      result = cleanString('just&nbsp;fine & dandy');
    });

    it('should return the string as is', () => {
      result.should.eql('just fine & dandy');
    });
  });
});
