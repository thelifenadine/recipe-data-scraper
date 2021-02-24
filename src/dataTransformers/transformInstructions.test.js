import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

describe('transformInstructions', () => {
  let transformInstructions;
  const loggerStub = sinon.stub();
  const cleanStringStub = sinon.stub();

  before(() => {
    transformInstructions = proxyquire.noCallThru().load('./transformInstructions', {
      '../utils/logger': loggerStub,
      '../utils/cleanString': cleanStringStub,
    }).default;
  });

  describe('expected behavior when passed a string', () => {
    let result;

    before(() => {
      cleanStringStub.withArgs('test').returns('clean test');
      result = transformInstructions('test');
    });

    it('the param should be returned in an array', () => {
      result.should.eql(['clean test']);
    });
  });

  describe('expected behavior when passed an array of strings', () => {
    let result;

    before(() => {
      cleanStringStub.withArgs('test-1').returns('clean test-1');
      cleanStringStub.withArgs('yo').returns('clean yo');
      result = transformInstructions(['test-1', 'yo']);
    });

    it('the argument should be returned as is', () => {
      result.should.eql(['clean test-1', 'clean yo']);
    });
  });

  describe('expected behavior when passed an array of objects with the expected format', () => {
    let result;

    before(() => {
      result = transformInstructions([{ text: 'test-1' }, { text: 'yo' }]);
    });

    it('the argument should be returned as an array of strings', () => {
      result.should.eql(['clean test-1', 'clean yo']);
    });
  });

  describe('expected behavior when passed an array of objects with another format', () => {
    before(() => {
      transformInstructions([{ random: 'log-me' }]);
    });

    it('logger should be invoked', () => {
      sinon.assert
        .calledOnceWithExactly(loggerStub, 'recipe instructions array has different format', [{ random: 'log-me' }]);
    });
  });

  describe('custom handling for king arthur flour', () => {
    let result;

    before(() => {
      cleanStringStub.withArgs('test abc').returns('clean test., test two., test three');
      result = transformInstructions('test abc');
    });

    it('the param should be returned in an array', () => {
      result.should.eql(['clean test', 'test two', 'test three']);
    });
  });
});

describe('transformInstructions no stubs', () => {
  let transformInstructions;

  before(() => {
    transformInstructions = proxyquire.noCallThru().load('./transformInstructions', {
    }).default;
  });

  describe('https://www.bbcgoodfood.com/recipes/easy-honey-flapjacks', () => {
    let result;

    before(() => {
      result = transformInstructions([
        {
          '@type': 'HowToStep',
          text: '<p>Heat the oven to 180C/160C fan/gas 4. Butter and line a 30 x 15cm rectangle tin with baking parchment. Melt the butter, sugar and honey in a pan over a medium heat, stirring frequently until the butter has melted and the mixture is smooth.</p>'
        },
        {
          '@type': 'HowToStep',
          text: '<p>Put the oats in&nbsp;a <a href="https://www.bbcgoodfood.com/content/top-five-mixing-bowls">mixing bowl</a>, then pour over the butter and honey mixture. Tip into the prepared tin, and use a <a href="https://www.bbcgoodfood.com/content/test-best-spatulas">spatula</a> to evenly spread out the mixture.&nbsp;Cook for 10-15&nbsp;mins. Leave to cool in the tin, then remove before cutting into squares.</p>'
        }
      ]);
    });

    it('the instructions should be transformed as expected', () => {
      result.should.eql([
        'Heat the oven to 180C/160C fan/gas 4. Butter and line a 30 x 15cm rectangle tin with baking parchment. Melt the butter, sugar and honey in a pan over a medium heat, stirring frequently until the butter has melted and the mixture is smooth.',
        'Put the oats in a mixing bowl, then pour over the butter and honey mixture. Tip into the prepared tin, and use a spatula to evenly spread out the mixture. Cook for 10-15 mins. Leave to cool in the tin, then remove before cutting into squares.'
      ]);
    });
  });

  describe('https://www.bbcgoodfood.com/recipes/easy-honey-flapjacks', () => {
    let result;

    before(() => {
      result = transformInstructions([
        'Preparation                                        Make the mango hot sauce: Heat the oil in a medium pan over low\n' +
        'heat. Add the shallots, chiles, garlic, turmeric, and mango and sauté\n' +
        'for 5 to 7 minutes, until the aromatics start to soften. Add the salt,\n' +
        'vinegar, and ½ cup water. Stir to combine, then cover and simmer until\n' +
        'the aromatics are completely softened and the liquid thickens slightly,\n' +
        'about 10 minutes.\n' +
        '                                                                            Transfer the mixture to a blender and blend until smooth. Stir in the\n' +
        'orange juice and season with more salt to taste. Transfer the hot sauce\n' +
        'to a resealable glass jar and refrigerate until ready to use. (The hot\n' +
        'sauce will keep for up to 2 weeks.)\n' +
        '                                                                            Make the lime sour cream: In a medium bowl, stir together the sour\n' +
        'cream, lime zest and juice, and salt. Refrigerate until ready to serve.\n' +
        '                                                                            Make the plantains: Fill a large Dutch oven or heavy-bottomed pot\n' +
        'about two-thirds of the way with vegetable oil. Heat over medium heat\n' +
        'until the oil reaches 375°F.\n' +
        '                        '
      ]);
    });

    it('the instructions should be transformed as expected', () => {
      result.should.eql([
        'Preparation Make the mango hot sauce: Heat the oil in a medium pan over low heat. Add the shallots, chiles, garlic, turmeric, and mango and sauté for 5 to 7 minutes, until the aromatics start to soften. Add the salt, vinegar, and ½ cup water. Stir to combine, then cover and simmer until the aromatics are completely softened and the liquid thickens slightly, about 10 minutes. Transfer the mixture to a blender and blend until smooth. Stir in the orange juice and season with more salt to taste. Transfer the hot sauce to a resealable glass jar and refrigerate until ready to use. (The hot sauce will keep for up to 2 weeks.) Make the lime sour cream: In a medium bowl, stir together the sour cream, lime zest and juice, and salt. Refrigerate until ready to serve. Make the plantains: Fill a large Dutch oven or heavy-bottomed pot about two-thirds of the way with vegetable oil. Heat over medium heat until the oil reaches 375°F.'
      ]);
    });
  });

  describe('https://tastykitchen.com/recipes/soups/chorizo-lentil-stew/', () => {
    let result;

    before(() => {
      result = transformInstructions([
        'In a big stockpot, brown the chorizo, stirring constantly, about 5-7 minutes. Remove from heat and stir in the spinach; Season with salt to taste (I ended up using maybe 1/2 teaspoon of salt and no pepper). Serve hot with goat cheese!\n' +
        'Note: If you would like to use canned cooked lentils, make sure they are rinsed and drained, No need to go the full 30 minutes if they’re already cooked!\n'
      ]);
    });

    it('the instructions should be transformed as expected', () => {
      result.should.eql([
        'In a big stockpot, brown the chorizo, stirring constantly, about 5-7 minutes. Remove from heat and stir in the spinach; Season with salt to taste (I ended up using maybe 1/2 teaspoon of salt and no pepper). Serve hot with goat cheese! Note: If you would like to use canned cooked lentils, make sure they are rinsed and drained, No need to go the full 30 minutes if they’re already cooked!',
      ]);
    });
  });
});
