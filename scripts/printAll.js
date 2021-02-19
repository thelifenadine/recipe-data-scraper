import axios from 'axios';
import cheerio from 'cheerio';
import { question } from 'readline-sync';
import { microdataUrls, jsonLdUrls } from './testResponses';
import MicrodataScraper from '../src/scrapers/MicrodataScraper';
import JsonLdScraper from '../src/scrapers/JsonLdScraper';
const errorMessage = 'Could not find recipe data';

async function findAndPrintRecipeData(url) {
  let chtml;

  try {
    // load html from scraped url
    const resp = await axios(url);
    chtml = cheerio.load(resp.data);
  } catch (error) {
    throw new Error(errorMessage);
  }

  try {
    // attempt to find JsonLd data, return recipe or log and continue
    const jsonLdScraper = new JsonLdScraper(chtml, url);

    jsonLdScraper.getRecipe();
    jsonLdScraper.print();

    return;
  } catch (error) {
    console.log('main:JsonLdScraper', {
      ...error,
      url,
    });
  }

  try {
    // attempt to find microdata, return recipe or log and continue
    const microdataScraper = new MicrodataScraper(chtml, url);
    microdataScraper.getRecipe();
    microdataScraper.print();
    return;
  } catch (error) {
    console.log('main:MicrodataScraper', {
      ...error,
      url,
    });
  }

  // could add a Scraper for rdfa in the future

  // throw if no recipe found
  throw new Error(errorMessage);
};

async function attemptPrintRecipe(url) {
  try {
    console.log(`- - - - - ${url} - - - - -`);
    await findAndPrintRecipeData(url);
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

      if (answer && answer === 'y') {
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

  if (!url || url === 'q') {
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
  const option = question(`Would you like to run through the preset urls? (y/n): `);

  if (option && option === 'y') {
    printRecipeCollection({ ...microdataUrls, ...jsonLdUrls });
  } else {
    const option2 = question(`Would you like to test a custom url? (y/n) `);
    if (option2 && option2 === 'y') {
      enterCustomUrl(option2);
    } else {
      console.log('Quitting...');
      process.exit(1);
    }
  }
}

export default recipeTesterPrintAll();

