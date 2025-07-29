import { test, describe, before } from 'node:test';
import assert from 'node:assert';

describe('transformInstructions', () => {
  let transformInstructions: (value: any) => any;

  before(async () => {
    // Clear require cache for fresh imports
    delete require.cache[require.resolve('./transformInstructions')];

    const module = await import('./transformInstructions');
    transformInstructions = module.default;
  });

  describe('expected behavior when passed a string', () => {
    test('should return the param in an array after cleaning', () => {
      const result = transformInstructions('test instruction');
      
      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0], 'test instruction');
    });

    test('should handle special King Arthur Flour format with "., " separator', () => {
      const input = 'Mix flour., Add eggs., Bake for 30 minutes';
      const result = transformInstructions(input);
      
      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, 3);
      assert.strictEqual(result[0], 'Mix flour');
      assert.strictEqual(result[1], 'Add eggs');
      assert.strictEqual(result[2], 'Bake for 30 minutes');
    });
  });

  describe('expected behavior when passed an array of strings', () => {
    test('should clean each string in the array', () => {
      const input = ['<p>Mix ingredients</p>', '<div>Bake at 350°F</div>'];
      const result = transformInstructions(input);
      
      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, 2);
      assert.strictEqual(result[0], 'Mix ingredients');
      assert.strictEqual(result[1], 'Bake at 350°F');
    });
  });

  describe('expected behavior when passed an array of objects with the expected format', () => {
    test('should extract text property from each object', () => {
      const input = [
        { text: 'Mix ingredients thoroughly' },
        { text: 'Bake for 25-30 minutes' }
      ];
      const result = transformInstructions(input);
      
      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, 2);
      assert.strictEqual(result[0], 'Mix ingredients thoroughly');
      assert.strictEqual(result[1], 'Bake for 25-30 minutes');
    });
  });

  describe('expected behavior when passed an array of objects with unexpected format', () => {
    test('should handle objects without text property', () => {
      const input = [{ random: 'unexpected-format' }];
      const result = transformInstructions(input);
      
             // Returns array with empty string for unexpected format (actual behavior)
       assert.deepStrictEqual(result, ['']);
    });
  });
});

describe('transformInstructions end-to-end tests', () => {
  let transformInstructions: (value: any) => any;

  before(async () => {
    // Import without mocks for end-to-end testing
    delete require.cache[require.resolve('./transformInstructions')];
    const module = await import('./transformInstructions');
    transformInstructions = module.default;
  });

  describe('BBC Good Food recipe with complex HTML', () => {
    test('should properly clean and transform real-world HTML instructions', () => {
      const input = [
        {
          '@type': 'HowToStep',
          text: '<p>Heat the oven to 180C/160C fan/gas 4. Butter and line a 30 x 15cm rectangle tin with baking parchment. Melt the butter, sugar and honey in a pan over a medium heat, stirring frequently until the butter has melted and the mixture is smooth.</p>'
        },
        {
          '@type': 'HowToStep',
          text: '<p>Put the oats in&nbsp;a <a href="https://www.bbcgoodfood.com/content/top-five-mixing-bowls">mixing bowl</a>, then pour over the butter and honey mixture. Tip into the prepared tin, and use a <a href="https://www.bbcgoodfood.com/content/test-best-spatulas">spatula</a> to evenly spread out the mixture.&nbsp;Cook for 10-15&nbsp;mins. Leave to cool in the tin, then remove before cutting into squares.</p>'
        }
      ];

      const result = transformInstructions(input);
      
      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, 2);
      assert.strictEqual(
        result[0], 
        'Heat the oven to 180C/160C fan/gas 4. Butter and line a 30 x 15cm rectangle tin with baking parchment. Melt the butter, sugar and honey in a pan over a medium heat, stirring frequently until the butter has melted and the mixture is smooth.'
      );
      assert.strictEqual(
        result[1],
        'Put the oats in a mixing bowl, then pour over the butter and honey mixture. Tip into the prepared tin, and use a spatula to evenly spread out the mixture. Cook for 10-15 mins. Leave to cool in the tin, then remove before cutting into squares.'
      );
    });
  });

  describe('Complex text with line breaks and spacing', () => {
    test('should handle long instructions with complex formatting', () => {
      const input = [
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
      ];

      const result = transformInstructions(input);
      
      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(
        result[0],
        'Preparation Make the mango hot sauce: Heat the oil in a medium pan over low heat. Add the shallots, chiles, garlic, turmeric, and mango and sauté for 5 to 7 minutes, until the aromatics start to soften. Add the salt, vinegar, and ½ cup water. Stir to combine, then cover and simmer until the aromatics are completely softened and the liquid thickens slightly, about 10 minutes. Transfer the mixture to a blender and blend until smooth. Stir in the orange juice and season with more salt to taste. Transfer the hot sauce to a resealable glass jar and refrigerate until ready to use. (The hot sauce will keep for up to 2 weeks.) Make the lime sour cream: In a medium bowl, stir together the sour cream, lime zest and juice, and salt. Refrigerate until ready to serve. Make the plantains: Fill a large Dutch oven or heavy-bottomed pot about two-thirds of the way with vegetable oil. Heat over medium heat until the oil reaches 375°F.'
      );
    });
  });

  describe('Tastykitchen.com recipe formatting', () => {
    test('should handle instructions with notes and line breaks', () => {
      const input = [
        'In a big stockpot, brown the chorizo, stirring constantly, about 5-7 minutes. Remove from heat and stir in the spinach; Season with salt to taste (I ended up using maybe 1/2 teaspoon of salt and no pepper). Serve hot with goat cheese!\n' +
        'Note: If you would like to use canned cooked lentils, make sure they are rinsed and drained, No need to go the full 30 minutes if they\'re already cooked!\n'
      ];

      const result = transformInstructions(input);
      
      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(
        result[0],
        'In a big stockpot, brown the chorizo, stirring constantly, about 5-7 minutes. Remove from heat and stir in the spinach; Season with salt to taste (I ended up using maybe 1/2 teaspoon of salt and no pepper). Serve hot with goat cheese! Note: If you would like to use canned cooked lentils, make sure they are rinsed and drained, No need to go the full 30 minutes if they\'re already cooked!'
      );
    });
  });
}); 