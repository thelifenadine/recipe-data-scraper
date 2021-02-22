import { question } from 'readline-sync';
import { microdataUrls, jsonLdUrls } from './testResponses';
import recipeDataScraper from '../src/main';

async function attemptPrintRecipe(url) {
  try {
    console.log(`- - - - - ${url} - - - - -`);
    await recipeDataScraper(url, { printToConsole: true });
    console.log(' - - - - - - - end recipe - - - - - - - - - -');
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

async function printRecipeCollection(recipes) {
  for (const recipe in recipes) {
    if (Object.hasOwnProperty.call(recipes, recipe)) {
      const recipeInfo = recipes[recipe];

      const answer = question(`Print next recipe? (y/n): `);

      if (answer === 'y') {
        await attemptPrintRecipe(recipeInfo.originalUrl);
      } else {
        console.log('Quitting...');
        process.exit(1);
      }
    }
  }
}

async function enterCustomUrl() {
  const url = question(`Enter Recipe Url: (or q to quit): `);

  if (url === 'q') {
    console.log('Quitting! Come back later!');
    process.exit(1);
  }

  await attemptPrintRecipe(url);
  enterCustomUrl();
}

/*
  This script allows one to run through the list of test urls and see the recipe
  data that was scraped from the website and compare it to the transformed data
  returned by the library.

  One can opt out of testing the preset list and enter recipes by url.
*/
async function recipeTesterPrintAll() {
  console.log(' - - - - - - - - - - - - - - - - -');
  const printPresetOption = question(`Would you like to run through the preset urls? (y/n): `);

  if (printPresetOption === 'y') {
    printRecipeCollection({ ...microdataUrls, ...jsonLdUrls });
  } else {
    const testCustomUrlOption = question(`Would you like to test a custom url? (y/n) `);
    if (testCustomUrlOption === 'y') {
      enterCustomUrl(testCustomUrlOption);
    } else {
      console.log('Quitting...');
      process.exit(1);
    }
  }
}

export default recipeTesterPrintAll();

