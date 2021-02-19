import { question } from 'readline-sync';
import recipeDataScraper from '../src/main';
import { microdataUrls, jsonLdUrls } from '../src/utils/testResponses';

async function printData(urlCollection) {
  for (const recipe in urlCollection) {
    if (Object.hasOwnProperty.call(urlCollection, recipe)) {
      const recipeInfo = urlCollection[recipe];

      console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * *');
      console.log(`- - - - - ${recipeInfo.originalUrl} - - - - -`);
      try {
        const data = await recipeDataScraper(recipeInfo.originalUrl);
        console.log(data);
      } catch (error) {
        console.log('Something went wrong', error);
      }
      console.log(' - - - - - - - end recipe - - - - - - - - - -');
    }
  }
}

function testAllUrls() {
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

export default testAllUrls();
