import { test, describe, before } from 'node:test';
import assert from 'node:assert';
import * as cheerio from 'cheerio';
import JsonLdScraper from './JsonLdScraper';

describe('JsonLdScraper', () => {
  describe('isRecipeType method', () => {
    let scraper: JsonLdScraper;

    before(() => {
      const mockHtml = '<html><body></body></html>';
      const chtml = cheerio.load(mockHtml) as any;
      scraper = new JsonLdScraper(chtml);
    });

    test('should return true for string "Recipe"', () => {
      // @ts-expect-error - accessing private method for testing
      const result = scraper.isRecipeType('Recipe');
      assert.strictEqual(result, true);
    });

    test('should return false for string "Article"', () => {
      // @ts-expect-error - accessing private method for testing
      const result = scraper.isRecipeType('Article');
      assert.strictEqual(result, false);
    });

    test('should return true for array containing "Recipe"', () => {
      // @ts-expect-error - accessing private method for testing
      const result = scraper.isRecipeType(['Recipe', 'NewsArticle']);
      assert.strictEqual(result, true);
    });

    test('should return false for array not containing "Recipe"', () => {
      // @ts-expect-error - accessing private method for testing
      const result = scraper.isRecipeType(['Article', 'NewsArticle']);
      assert.strictEqual(result, false);
    });

    test('should return false for null', () => {
      // @ts-expect-error - accessing private method for testing
      const result = scraper.isRecipeType(null);
      assert.strictEqual(result, false);
    });

    test('should return false for undefined', () => {
      // @ts-expect-error - accessing private method for testing
      const result = scraper.isRecipeType(undefined);
      assert.strictEqual(result, false);
    });

    test('should return false for number', () => {
      // @ts-expect-error - accessing private method for testing
      const result = scraper.isRecipeType(123);
      assert.strictEqual(result, false);
    });
  });

  describe('testForMetadata', () => {
    test('should find and parse valid JSON-LD script tag', () => {
      const mockHtml = `
        <html>
          <head>
            <script type="application/ld+json">
              {
                "@context": "http://schema.org",
                "@type": "Recipe",
                "name": "Test Recipe"
              }
            </script>
          </head>
        </html>
      `;
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.testForMetadata();
      
      assert.notStrictEqual(scraper.meta, null);
      assert.strictEqual((scraper.meta as any)['@type'], 'Recipe');
      assert.strictEqual((scraper.meta as any).name, 'Test Recipe');
    });

    test('should handle multiple JSON-LD script tags', () => {
      const mockHtml = `
        <html>
          <head>
            <script type="application/ld+json">
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "Test Org"
              }
            </script>
            <script type="application/ld+json">
              {
                "@context": "http://schema.org",
                "@type": "Recipe",
                "name": "Test Recipe"
              }
            </script>
          </head>
        </html>
      `;
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.testForMetadata();
      
      assert.strictEqual(Array.isArray(scraper.meta), true);
      assert.strictEqual((scraper.meta as any).length, 2);
    });

    test('should handle malformed JSON gracefully', () => {
      const mockHtml = `
        <html>
          <head>
            <script type="application/ld+json">
              { invalid json }
            </script>
            <script type="application/ld+json">
              {
                "@context": "http://schema.org",
                "@type": "Recipe",
                "name": "Valid Recipe"
              }
            </script>
          </head>
        </html>
      `;
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.testForMetadata();
      
      assert.notStrictEqual(scraper.meta, null);
      assert.strictEqual((scraper.meta as any)['@type'], 'Recipe');
      assert.strictEqual((scraper.meta as any).name, 'Valid Recipe');
    });

    test('should handle empty script tags', () => {
      const mockHtml = `
        <html>
          <head>
            <script type="application/ld+json"></script>
            <script type="application/ld+json">   </script>
          </head>
        </html>
      `;
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.testForMetadata();
      
      assert.strictEqual(scraper.meta, null);
    });

    test('should return null when no JSON-LD script tags found', () => {
      const mockHtml = '<html><head></head></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.testForMetadata();
      
      assert.strictEqual(scraper.meta, null);
    });
  });

  describe('findRecipeItem', () => {
    test('should find Recipe with @type as string', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.meta = {
        '@context': 'http://schema.org',
        '@type': 'Recipe',
        'name': 'Test Recipe'
      } as any;
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem?.name, 'Test Recipe');
    });

    test('should find Recipe with @type as array (Allrecipes case)', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.meta = {
        '@context': 'http://schema.org',
        '@type': ['Recipe', 'NewsArticle'],
        'name': 'Test Recipe'
      } as any;
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem?.name, 'Test Recipe');
    });

    test('should find Recipe in array of JSON-LD objects', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.meta = [
        {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          'name': 'Test Org'
        },
        {
          '@context': 'http://schema.org',
          '@type': 'Recipe',
          'name': 'Test Recipe'
        }
      ] as any;
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem?.name, 'Test Recipe');
    });

    test('should find Recipe in @graph structure', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.meta = {
        '@context': 'http://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            'name': 'Test Site'
          },
          {
            '@type': 'Recipe',
            'name': 'Test Recipe'
          }
        ]
      } as any;
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem?.name, 'Test Recipe');
    });

    test('should return null when no Recipe found', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.meta = {
        '@context': 'http://schema.org',
        '@type': 'Article',
        'name': 'Test Article'
      } as any;
      
      scraper.findRecipeItem();
      
      assert.strictEqual(scraper.recipeItem, null);
    });

    test('should return null when meta is null', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.meta = null;
      scraper.findRecipeItem();
      
      assert.strictEqual(scraper.recipeItem, null);
    });

    test('should handle malformed objects in graph gracefully', () => {
      const mockHtml = '<html></html>';
      const chtml = cheerio.load(mockHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      scraper.meta = {
        '@context': 'http://schema.org',
        '@graph': [
          null,
          { '@type': undefined },
          {
            '@type': 'Recipe',
            'name': 'Valid Recipe'
          }
        ]
      } as any;
      
      scraper.findRecipeItem();
      
      assert.notStrictEqual(scraper.recipeItem, null);
      assert.strictEqual(scraper.recipeItem?.name, 'Valid Recipe');
    });
  });

  describe('integration test', () => {
    test('should successfully extract recipe from Allrecipes-style JSON-LD', () => {
      const allrecipesStyleHtml = `
        <html>
          <head>
            <script type="application/ld+json">
              {
                "@context": "http://schema.org",
                "@type": ["Recipe", "NewsArticle"],
                "name": "Grandma's Lemon Meringue Pie",
                "recipeIngredient": [
                  "1 cup white sugar",
                  "2 tablespoons all-purpose flour"
                ],
                "recipeInstructions": [
                  {
                    "@type": "HowToStep",
                    "text": "Gather all ingredients."
                  }
                ]
              }
            </script>
          </head>
        </html>
      `;
      
      const chtml = cheerio.load(allrecipesStyleHtml) as any;
      const scraper = new JsonLdScraper(chtml);
      
      const recipe = scraper.getRecipe();
      
      assert.strictEqual(recipe.name, "Grandma's Lemon Meringue Pie");
      assert.strictEqual(Array.isArray(recipe.recipeIngredients), true);
      assert.strictEqual(recipe.recipeIngredients?.length, 2);
    });
  });
}); 