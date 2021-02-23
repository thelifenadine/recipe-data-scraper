import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('transformIsoToString', () => {
  let transformIsoToString;

  before(() => {
    transformIsoToString = proxyquire.noCallThru().load('./transformIsoToString', {
    }).default;
  });

  describe('expected behavior', () => {
    it('should return the duration in a readable format', () => {
      transformIsoToString({
        days: 1,
        hours: 2,
      }).should.eql('1 day 2 hours');
    });

    it('should return the duration in a readable format', () => {
      transformIsoToString({
        days: 1,
        hours: 2,
        minutes: 3,
        seconds: 1,
      }).should.eql('1 day 2 hours 3 minutes 1 second');
    });
  });
});
