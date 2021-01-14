import { question } from 'readline-sync';
import scraper from '../src/scraper';

async function recipeUrlTester() {
  console.log(' - - - - - - - - - - - - - - - - -');
  console.log('Welcome to the Recipe Url tester!')
  const answer = question(`Enter Recipe Url: `);

  if (!answer) {
    console.log('Quitting! Come back when you\'re ready!');
    process.exit(1);
  }

  console.log(`Getting Recipe Data...`);

  try {
    const data = await scraper(answer);
    console.log('The Recipe data you requested!')
    console.log(data);
  } catch (error) {
    console.log('Something went wrong, maybe try a different url')
  }

  const again = question(`Would you like to test another url? (y/n): `);

  if (again && (again === 'y' || again === 'yes')) {
    recipeUrlTester();
  } else {
    console.log('Quitting! Come back soon!');
    process.exit(1);
  }
}

export default recipeUrlTester();