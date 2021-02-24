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
    describe('days unit', () => {
      it('should return the plural for more than 1, singular for 1, and leave off 0', () => {
        transformIsoToString({
          days: 2,
          hours: 2,
        }).should.eql('2 days 2 hours');

        transformIsoToString({
          days: 1,
          hours: 2,
        }).should.eql('1 day 2 hours');

        transformIsoToString({
          days: 0,
          hours: 2,
          minutes: 30,
        }).should.eql('2 hours 30 minutes');
      });

      it('should ignore other units months, years', () => {
        transformIsoToString({
          months: 3,
          years: 4,
          days: 1,
          hours: 2,
          minutes: 3,
          seconds: 1,
        }).should.eql('1 day 2 hours 3 minutes 1 second');
      });
    });

    describe('hours unit', () => {
      it('should return the plural for more than 1, singular for 1, and leave off 0', () => {
        transformIsoToString({
          days: 2,
          hours: 7,
        }).should.eql('2 days 7 hours');

        transformIsoToString({
          days: 1,
          hours: 1,
          minutes: 0,
          seconds: 45,
        }).should.eql('1 day 1 hour 45 seconds');

        transformIsoToString({
          days: 0,
          hours: 0,
          minutes: 30,
        }).should.eql('30 minutes');
      });
    });

    describe('minutes unit', () => {
      it('should return the plural for more than 1, singular for 1, and leave off 0', () => {
        transformIsoToString({
          days: 0,
          hours: 0,
          minutes: 90,
        }).should.eql('90 minutes');

        transformIsoToString({
          days: 1,
          hours: 1,
          minutes: 1,
          seconds: 0,
        }).should.eql('1 day 1 hour 1 minute');

        transformIsoToString({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 90,
        }).should.eql('90 seconds');
      });
    });

    describe('seconds unit', () => {
      it('should return the plural for more than 1, singular for 1, and leave off 0', () => {
        transformIsoToString({
          days: 0,
          hours: 0,
          minutes: 30,
          seconds: 30,
        }).should.eql('30 minutes 30 seconds');

        transformIsoToString({
          days: 0,
          hours: 1,
          minutes: 0,
          seconds: 1,
        }).should.eql('1 hour 1 second');

        transformIsoToString({
          days: 0,
          hours: 0,
          minutes: 30,
          seconds: 0,
        }).should.eql('30 minutes');
      });
    });
  });
});
