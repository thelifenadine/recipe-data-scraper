import { question } from 'readline-sync';
import recipeDataScraper from '../src/index';
import { RecipeWithUrl, ScrapingOptions } from '../src/types';

/*
  This script takes a url from the user and prints the parsed data
  so that a user can test the functionality without a UI
*/
async function recipeUrlTester(): Promise<void> {
  console.log(' - - - - - - - - - - - - - - - - -');
  console.log('Welcome to the Recipe Url tester!');
  
  const answer: string = question('Enter Recipe Url: ');

  if (!answer) {
    console.log('Quitting! Come back when you\'re ready!');
    process.exit(1);
  }

  console.log('Looking for Recipe Data...');

  try {
    const options: ScrapingOptions = { printToConsole: true };
    const data: RecipeWithUrl = await recipeDataScraper(answer, options);

    console.log('The Recipe data you requested!');
    console.log(data);
  } catch (error: unknown) {
    console.log('Something went wrong, maybe try a different url');
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const again: string = question('Would you like to test another url? (y/n): ');

  if (again === 'y') {
    await recipeUrlTester();
  } else {
    console.log('Quitting! Come back soon!');
    process.exit(0);
  }
}

// Execute the function
recipeUrlTester().catch((error: unknown) => {
  console.error('Unexpected error:', error);
  process.exit(1);
}); 