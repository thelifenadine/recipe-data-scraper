
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

async function printData(urlCollection) {
  for (const recipe in urlCollection) {
    if (Object.hasOwnProperty.call(microdataUrls, recipe)) {
      const recipeInfo = microdataUrls[recipe];

      try {
        console.log(`- - - - - ${recipeInfo.originalUrl} - - - - -`);
        await print(recipeInfo.originalUrl);
        console.log(' - - - - - - - end recipe - - - - - - - - - -');
      } catch (error) {
        console.log('Something went wrong', error);
      }
    }
  }
}

function recipeUrlTester() {
  console.log(' - - - - - - - - - - - - - - - - -');
  const answer = question(`Would you like to run all of the test urls? (y/n): `);

  if (answer && (answer === 'y' || answer === 'yes')) {
    printData(microdataUrls);
    printData(jsonLdUrls);
  } else {
    console.log('Quitting...');
    process.exit(1);
  }
}

export default recipeUrlTester();

