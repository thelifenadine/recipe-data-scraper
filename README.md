[![Build Status](https://travis-ci.com/thelifenadine/recipe-data-scraper.svg?token=zksFH4xCnprxMjskVPuR&branch=master)](https://travis-ci.com/thelifenadine/recipe-data-scraper)[![Coverage Status](https://coveralls.io/repos/github/thelifenadine/recipe-data-scraper/badge.svg?branch=master)](https://coveralls.io/github/thelifenadine/recipe-data-scraper?branch=master)


A node library that takes a url as an input and scrapes the page for recipe data.

Usage:
```javascript
import scraper from  'dough-scraper';
...
const recipeData = await scraper(url);
```
Peer dependencies: `lodash`
