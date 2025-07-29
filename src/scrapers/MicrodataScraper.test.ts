import { test, describe } from 'node:test';
import assert from 'node:assert';
import * as cheerio from 'cheerio';
import MicrodataScraper from './MicrodataScraper';

describe('MicrodataScraper', () => {
  describe('findRecipeItem', () => {
    test('should find Recipe item in microdata', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      scraper.meta = {
        items: [
          {
            type: ['http://schema.org/Recipe'],
            properties: {
              name: ['Test Recipe'],
              recipeIngredient: ['1 cup flour', '2 eggs']
            }
          }
        ]
      };
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem.name[0], 'Test Recipe');
      assert.strictEqual(scraper.recipeItem.recipeIngredient.length, 2);
    });

    test('should find Recipe item when multiple items exist', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      scraper.meta = {
        items: [
          {
            type: ['http://schema.org/Organization'],
            properties: {
              name: ['Test Organization']
            }
          },
          {
            type: ['http://schema.org/Recipe'],
            properties: {
              name: ['Test Recipe']
            }
          }
        ]
      };
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem.name[0], 'Test Recipe');
    });

    test('should handle Recipe type without full schema.org URL', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      scraper.meta = {
        items: [
          {
            type: ['Recipe'],
            properties: {
              name: ['Simple Recipe']
            }
          }
        ]
      };
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem.name[0], 'Simple Recipe');
    });

    test('should return null when no Recipe item found', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      scraper.meta = {
        items: [
          {
            type: ['http://schema.org/Article'],
            properties: {
              name: ['Test Article']
            }
          }
        ]
      };
      
      scraper.findRecipeItem();
      
      assert.strictEqual(scraper.recipeItem, null);
    });

    test('should return null when meta is null', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      scraper.meta = null;
      scraper.findRecipeItem();
      
      assert.strictEqual(scraper.recipeItem, null);
    });

    test('should return null when meta has no items', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      scraper.meta = { items: [] };
      scraper.findRecipeItem();
      
      assert.strictEqual(scraper.recipeItem, null);
    });

    test('should handle items without type gracefully', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      scraper.meta = {
        items: [
          {
            // Item without type property
            properties: {
              name: ['Invalid Item']
            }
          } as any,
          {
            type: ['http://schema.org/Recipe'],
            properties: {
              name: ['Valid Recipe']
            }
          }
        ]
      };
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem.name[0], 'Valid Recipe');
    });
  });

  describe('type property checks', () => {
    test('should verify the scraper type property', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      assert.strictEqual(scraper.type, 'microdata');
    });

    test('should initialize with null values', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new MicrodataScraper(chtml);
      
      assert.strictEqual(scraper.meta, null);
      assert.strictEqual(scraper.recipeItem, null);
    });
  });
}); 