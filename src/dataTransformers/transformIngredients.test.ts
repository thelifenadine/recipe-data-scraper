import { test, describe } from 'node:test';
import assert from 'node:assert';
import transformIngredients from './transformIngredients';

describe('transformIngredients functionality', () => {
  describe('expected behavior when passed an array of strings', () => {
    test('should clean each ingredient string', () => {
      const input = [
        '1 cup pasta',
        'three teaspoons vanilla', 
        '1/4 tsp salt'
      ];
      const result = transformIngredients(input);
      
      // Test that we get back an array of the same length
      assert.strictEqual(result.length, 3);
      
      // Test that strings are processed (no HTML tags, cleaned formatting)
      assert.strictEqual(result[0], '1 cup pasta');
      assert.strictEqual(result[1], 'three teaspoons vanilla');
      assert.strictEqual(result[2], '1/4 tsp salt');
    });

         test('should clean HTML tags and extra spaces', () => {
       const input = [
         '<p>1  cup  flour</p>',
         '<span>2&nbsp;&nbsp;eggs</span>'
       ];
       const result = transformIngredients(input);
       
       assert.strictEqual(result[0], '1 cup flour');
       assert.strictEqual(result[1], '2  eggs'); // &nbsp;&nbsp; becomes multiple spaces
     });
  });

  describe('expected behavior when passed an array of objects containing properties key', () => {
    test('should extract name and amount from microdata format', () => {
      const microdataExample = {
        '0': {
          properties: {
            name: ['pasta'],
            amount: ['1 lb'],
          },
        },
        '1': {
          properties: {
            name: ['ice cream'],
            amount: ['2 cups'],
          },
        }
      };

      const result = transformIngredients(microdataExample as any);
      
      assert.strictEqual(result.length, 2);
      assert.strictEqual(result[0], '1 lb pasta');
      assert.strictEqual(result[1], '2 cups ice cream');
    });

    test('should handle ingredients with only name property', () => {
      const microdataExample = {
        '0': {
          properties: {
            name: ['1 cup all-purpose flour'],
          },
        },
        '1': {
          properties: {
            name: ['2 large eggs'],
          },
        }
      };

      const result = transformIngredients(microdataExample);
      
      assert.strictEqual(result.length, 2);
      assert.strictEqual(result[0], '1 cup all-purpose flour');
      assert.strictEqual(result[1], '2 large eggs');
    });

         test('should handle ingredients with only amount property', () => {
       const microdataExample = {
         '0': {
           properties: {
             amount: ['3 cups'],
           },
         }
       };

       const result = transformIngredients(microdataExample);
       
       assert.strictEqual(result.length, 1);
       assert.strictEqual(result[0], '3 cups undefined'); // Function concatenates amount + name, undefined name becomes "undefined"
     });
  });

  describe('expected behavior when passed an array of objects without properties key', () => {
    test('should return empty array for malformed microdata', () => {
      const microdataExample = {
        '0': {
          notProperties: {
            name: ['pasta'],
            amount: ['1 lb'],
          },
        },
        '1': {
          notProperties: {
            name: ['ice cream'],
            amount: ['2 cups'],
          },
        }
      };

      const result = transformIngredients(microdataExample as any);
      assert.deepStrictEqual(result, []);
    });

    test('should return empty array for completely empty microdata', () => {
      const microdataExample = {
        '0': {
          properties: {}
        }
      };

      const result = transformIngredients(microdataExample);
      assert.deepStrictEqual(result, []);
    });
  });

  describe('edge cases', () => {
    test('should handle empty array input', () => {
      const result = transformIngredients([]);
      assert.deepStrictEqual(result, []);
    });

    test('should handle mixed valid and invalid microdata entries', () => {
      const microdataExample = {
        '0': {
          properties: {
            name: ['flour'],
            amount: ['2 cups'],
          },
        },
        '1': {
          properties: {} // Empty properties
        },
        '2': {
          properties: {
            name: ['salt'],
            amount: ['1 tsp'],
          },
        }
      };

      const result = transformIngredients(microdataExample);
      
      assert.strictEqual(result.length, 2);
      assert.strictEqual(result[0], '2 cups flour');
      assert.strictEqual(result[1], '1 tsp salt');
    });
  });
}); 