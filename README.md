[![Build Status](https://travis-ci.com/thelifenadine/recipe-data-scraper.svg?token=zksFH4xCnprxMjskVPuR&branch=master)](https://travis-ci.com/thelifenadine/recipe-data-scraper)[![Coverage Status](https://coveralls.io/repos/github/thelifenadine/recipe-data-scraper/badge.svg?branch=master)](https://coveralls.io/github/thelifenadine/recipe-data-scraper?branch=master)


A node library that takes a url as an input and scrapes the page for recipe data.

Usage:
```javascript
import scraper from  'recipe-data-scraper';
...
const recipeData = await scraper(url);
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
