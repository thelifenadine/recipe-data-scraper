[![Build Status](https://travis-ci.com/thelifenadine/recipe-data-scraper.svg?token=zksFH4xCnprxMjskVPuR&branch=master)](https://travis-ci.com/thelifenadine/recipe-data-scraper) [![Coverage Status](https://coveralls.io/repos/github/thelifenadine/recipe-data-scraper/badge.svg?branch=master)](https://coveralls.io/github/thelifenadine/recipe-data-scraper?branch=master)

A node library that takes a given url and scrapes that webpage for recipe data. This library supports websites that utilize either [microdata](https://schema.org/Recipe) or [JSON-LD](https://developers.google.com/search/docs/data-types/recipe). The function returns a promise where on success will return the recipe and on fail will throw an error with the message: 'Could not find recipe data'

```
npm install recipe-data-scraper
```

Example Usage:

```javascript
import recipeDataScraper from  'recipe-data-scraper';

async function (...) {
  try {
    // pass a full url to a page that contains a recipe
    const recipe = await recipeDataScraper(url);
    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}

```

Or:

```javascript
import recipeDataScraper from 'recipe-data-scraper';

recipeDataScraper(url)
  .then((recipe) => res.json({ recipe }))
  .catch((err) => res.status(500).json({ message: err.message }));
```

# CLI:

If you want to try this library without a UI, you can clone it locally and run it via the command line.

```
git clone git@github.com:thelifenadine/recipe-data-scraper.git
npm install
npm run test-url
```

# Recipe Data Scraper

## Node.js Version Requirement

This project requires **Node.js 18.x** for optimal compatibility with all dependencies.

### Quick Setup

```bash
# Use the specified Node.js version
nvm use

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

The project includes a `.nvmrc` file that specifies Node.js 18. If you're using nvm, simply run `nvm use` in the project directory to switch to the correct version.

## Overview
