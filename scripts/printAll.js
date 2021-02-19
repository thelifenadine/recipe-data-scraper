
import axios from 'axios';
import cheerio from 'cheerio';
import { question } from 'readline-sync';
import { microdataUrls, jsonLdUrls } from '../src/utils/testResponses';
import MicrodataScraper from '../src/scrapers/MicrodataScraper';
import JsonLdScraper from '../src/scrapers/JsonLdScraper';
const errorMessage = 'Could not find recipe data';

async function print (url) {
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

async function printRecipe(url) {
  try {
    console.log(`- - - - - ${url} - - - - -`);
    await print(url);
    console.log(' - - - - - - - end recipe - - - - - - - - - -');
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

async function printRecipeCollection(recipes) {
  for (const recipe in recipes) {
    if (Object.hasOwnProperty.call(microdataUrls, recipe)) {
      const recipeInfo = microdataUrls[recipe];

      const answer = question(`Print next recipe? (y/n): `);

      if (answer && (answer === 'y' || answer === 'yes')) {
        await printRecipe(recipeInfo.originalUrl);
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

  await printRecipe(url);
  enterCustomUrl();
}

function recipeUrlTester() {
  console.log(' - - - - - - - - - - - - - - - - -');
  const option = question(`Would you like to run through the preset urls? (y/n): `);

  if (option && (option === 'y' || option === 'yes')) {
    printRecipeCollection(microdataUrls);
    printRecipeCollection(jsonLdUrls);
  } else {
    const option2 = question(`Would you like to test a custom url? (y/n) `);
    if (option2 && (option2 === 'y' || option2 === 'yes')) {
      enterCustomUrl(option2);
    } else {
      console.log('Quitting...');
      process.exit(1);
    }
  }
}

export default recipeUrlTester();

