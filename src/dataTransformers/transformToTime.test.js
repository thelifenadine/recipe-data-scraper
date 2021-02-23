import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('transformToTime', () => {
  let transformToTime;
  const loggerStub = sinon.stub();
  const isoParseStub = sinon.stub();
  const transformIsoToStringStub = sinon.stub();
  const transformToStringStub = sinon.stub();

  before(() => {
    transformToTime = proxyquire.noCallThru().load('./transformToTime', {
      '../utils/logger': loggerStub,
      'iso8601-duration': {
        parse: isoParseStub,
      },
      '../utils/transformIsoToString': transformIsoToStringStub,
      './transformToString': transformToStringStub,
    }).default;
  });

  describe('expected behavior for an ISO duration', () => {
    let result;

    before(() => {
      transformToStringStub.withArgs('PT10').returns('PT10');
      isoParseStub.withArgs('PT10').returns({ minutes: 10 });
      transformIsoToStringStub.withArgs({ minutes: 10 }).returns('10 minutes');
      result = transformToTime('PT10');
    });

    after(() => {
      transformToStringStub.reset();
      isoParseStub.reset();
      transformIsoToStringStub.reset();
    });

    it('should invoke transformToString on the value', () => {
      sinon.assert.calledOnceWithExactly(transformToStringStub, 'PT10');
    });

    it('should invoke parse on the value', () => {
      sinon.assert.calledOnceWithExactly(isoParseStub, 'PT10');
    });

    it('should invoke transformISOToString on the time object', () => {
      sinon.assert.calledOnceWithExactly(transformIsoToStringStub, {
        minutes: 10,
      });
    });

    it('should return the readable result', () => {
      result.should.eql('10 minutes');
    });
  });

  describe('expected behavior for an ISO duration', () => {
    let result;

    before(() => {
      transformToStringStub.withArgs('PT55').returns('PT55');
      isoParseStub.withArgs('PT55').returns(null);
      result = transformToTime('PT55');
    });

    after(() => {
      transformToStringStub.reset();
      isoParseStub.reset();
    });

    it('should invoke transformToString on the value', () => {
      sinon.assert.calledOnceWithExactly(transformToStringStub, 'PT55');
    });

    it('should invoke parse on the value', () => {
      sinon.assert.calledOnceWithExactly(isoParseStub, 'PT55');
    });

    it('should NOT invoke transformISOToString', () => {
      sinon.assert.notCalled(transformIsoToStringStub);
    });

    it('should NOT invoke the logger', () => {
      sinon.assert.notCalled(loggerStub);
    });

    it('should return the readable result', () => {
      result.should.eql('PT55');
    });
  });

  describe('expected behavior for another format', () => {
    let result;

    before(() => {
      transformToStringStub.withArgs('1 hour').returns('1 hour');
      isoParseStub.throws('some error');
      try {
        result = transformToTime('1 hour', 'cookTime');
      } catch (e) {
        // do nothing
      }
    });

    it('should invoke transformToString on the value', () => {
      sinon.assert.calledOnceWithExactly(transformToStringStub, '1 hour');
    });

    it('should invoke parse on the value', () => {
      sinon.assert.calledOnceWithExactly(isoParseStub, '1 hour');
    });

    it('should NOT invoke transformISOToString', () => {
      sinon.assert.notCalled(transformIsoToStringStub);
    });

    it('should invoke the logger with the property key', () => {
      sinon.assert.calledOnceWithExactly(loggerStub, `ISO date parsing failure for cookTime`);
    });

    it('should return the original duration', () => {
      result.should.eql('1 hour');
    });
  });
});
