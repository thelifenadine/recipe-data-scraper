[![Build Status](https://travis-ci.com/thelifenadine/dough-scraper.svg?branch=master)](https://travis-ci.com/thelifenadine/dough-scraper) [![Coverage Status](https://coveralls.io/repos/github/thelifenadine/dough-scraper/badge.svg?branch=master)](https://coveralls.io/github/thelifenadine/dough-scraper?branch=master)


A node library that takes a given url and scrapes that webpage for recipe data. This library supports websites that utilize either [microdata](https://schema.org/Recipe) or [JSON-LD](https://developers.google.com/search/docs/data-types/recipe). The function returns a promise that will either return the recipe data model or null if no recipe is found.
```
npm install recipe-data-scraper
```

Example Usage:
```javascript
import scraper from  'dough-scraper';
// ...
const recipeImporter = async (req, res, next) {
    const recipe = await scraper(url); // pass a full url that contains a recipe

    if (!recipe) {
        res.status(500).json({ message: 'Cound not find recipe data' });
    }

    res.json({ data: recipe });
}

```
Peer dependencies: `lodash`


#### Recipe Model:
| property | type |
| ----------- | ----------- |
| url | string |
| name | string |
| image | string |
| description | string |
| cookTime | string |
| prepTime | string |
| totalTime | string |
| recipeYield | string |
| recipeIngredients | array of strings |
| recipeInstructions | array of strings |
| recipeCategories | array of strings |
| recipeCuisines | array of strings |
| recipeTypes | array of strings |
| keywords | array of strings |
