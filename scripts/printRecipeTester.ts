import { question } from 'readline-sync';
import { microdataUrls, jsonLdUrls } from './testResponses';
import recipeDataScraper from '../src/index';
import { ScrapingOptions } from '../src/types';

// Type definitions for test response data
interface TestRecipeInfo {
  originalUrl: string;
  fullResponse?: any; // Optional - Could be MicrodataResponse or JsonLdRecipe[] depending on type
}

interface TestRecipeCollection {
  [key: string]: TestRecipeInfo;
}

async function attemptPrintRecipe(url: string): Promise<void> {
  try {
    console.log(`- - - - - ${url} - - - - -`);
    const options: ScrapingOptions = { printToConsole: true };
    await recipeDataScraper(url, options);
    console.log(' - - - - - - - end recipe - - - - - - - - - -');
  } catch (error: unknown) {
    console.log('Something went wrong', error);
  }
}

async function printRecipeCollection(recipes: TestRecipeCollection): Promise<void> {
  for (const recipe in recipes) {
    if (Object.hasOwnProperty.call(recipes, recipe)) {
      const recipeInfo = recipes[recipe];

      const answer: string = question(`Print next recipe? (y/n): `);

      if (answer === 'y') {
        await attemptPrintRecipe(recipeInfo.originalUrl);
      } else {
        console.log('Quitting...');
        process.exit(1);
      }
    }
  }
}

async function enterCustomUrl(): Promise<void> {
  const url: string = question(`Enter Recipe Url: (or q to quit): `);

  if (url === 'q') {
    console.log('Quitting! Come back later!');
    process.exit(1);
  }

  await attemptPrintRecipe(url);
  await enterCustomUrl(); // Fixed: Added await to prevent potential issues
}

/*
  This script allows one to run through the list of test urls and see the recipe
  data that was scraped from the website and compare it to the transformed data
  returned by the library.

  One can opt out of testing the preset list and enter recipes by url.
*/
async function recipeTesterPrintAll(): Promise<void> {
  console.log(' - - - - - - - - - - - - - - - - -');
  const printPresetOption: string = question(`Would you like to run through the preset urls? (y/n): `);

  if (printPresetOption === 'y') {
    await printRecipeCollection({ ...microdataUrls, ...jsonLdUrls });
  } else {
    const testCustomUrlOption: string = question(`Would you like to test a custom url? (y/n) `);
    if (testCustomUrlOption === 'y') {
      await enterCustomUrl();
    } else {
      console.log('Quitting...');
      process.exit(1);
    }
  }
}

export default recipeTesterPrintAll(); 