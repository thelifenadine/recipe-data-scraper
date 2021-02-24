import { should } from "chai";
import { MATCH_LINE_BREAK, MATCH_HTML_TAGS, MATCH_MULTI_SPACE } from './regex';
should();

describe('regex', () => {
  describe('MATCH_HTML_TAGS expected behavior', () => {
    describe('when matched against a string with no html', () => {
      const strWithoutHtml = '<p>test a <a href="go-somewhere">string</a> with</p> html';

      it('the string should not be modified', () => {
        strWithoutHtml
          .replace(MATCH_HTML_TAGS, '')
          .should.eql('test a string with html');
      });
    });

    describe('when matched against a string with html', () => {
      const strWithHtml = '<p>test a <a href="go-somewhere">string</a> with</p> html';

      it('the html tags should be removed', () => {
        strWithHtml
          .replace(MATCH_HTML_TAGS, '')
          .should.eql('test a string with html');
      });
    });

    describe('expected behavior when matched against a string with a script', () => {
      const strWithScript = '<script>alert("HEY!")</script> cut that out';

      it('the script tags should be removed', () => {
        strWithScript
          .replace(MATCH_HTML_TAGS, '')
          .should.eql('alert("HEY!") cut that out');
      });
    });
  });

  describe('MATCH_MULTI_SPACE expected behavior', () => {
    describe('when matched against a string with &nbsp;', () => {
      const testString = 'just&nbsp;fine & dandy';

      it('the string should not be modified', () => {
        testString
          .replace(MATCH_MULTI_SPACE, ' ')
          .should.eql('just fine & dandy');
      });
    });

    describe('when matched against a string with multiple spaces grouped together', () => {
      const testString = 'Preparation                                        Make the mango hot sauce: Heat the oil in a medium pan over low';

      it('the multiple spaces should be consolidated into one', () => {
        testString
          .replace(MATCH_MULTI_SPACE, ' ')
          .should.eql('Preparation Make the mango hot sauce: Heat the oil in a medium pan over low');
      });
    });

    describe('when matched against a string with a tab', () => {
      const testString = 'well  aint it fun     yep!';

      it('the multiple spaces should be consolidated into one', () => {
        testString
          .replace(MATCH_MULTI_SPACE, ' ')
          .should.eql('well aint it fun yep!');
      });
    });
  });

  describe('MATCH_LINE_BREAK expected behavior', () => {
    describe('when matched against a string with &nbsp;', () => {
      const testString = 'Make the mango hot sauce: Heat the oil in a medium pan over low\n' +
        'heat. Add the shallots, chiles, garlic, turmeric, and mango and sauté\n' +
        'about two-thirds of the way with vegetable oil. Heat over medium heat\n' +
        'until the oil reaches 375°F.';

      it('the string should be consolidated and line breaks replaced with spaces', () => {
        testString
          .replace(MATCH_LINE_BREAK, ' ')
          .should.eql('Make the mango hot sauce: Heat the oil in a medium pan over low heat. Add the shallots, chiles, garlic, turmeric, and mango and sauté about two-thirds of the way with vegetable oil. Heat over medium heat until the oil reaches 375°F.');
      });
    });
  });
});
