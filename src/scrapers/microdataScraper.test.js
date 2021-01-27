import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

const testResponse1 = { "items": [{ "properties": { "name": ["Smashed Potatoes with Sweet Corn Relish"], "recipeYield": ["Servings: 4 to 6"], "totalTime": ["2 hours plus an overnight brine"], "recipeIngredient": ["3 large ears sweet corn, shucked", "12 ripe cherry tomatoes, cut into 1/8-inch-thick slices", "1/2 cup finely diced red onion", "1/2 cup finely diced green bell pepper", "2 tablespoons minced jalapeno", "2 garlic cloves, ends cut off", "3/4 cup unseasoned rice vinegar", "1/4 cup raw cane sugar (see Note)", "1 tablespoon brown mustard seeds", "2 teaspoons cumin seeds", "1 teaspoon kosher salt", "1/2 teaspoon whole black peppercorns", "1/4 teaspoon ground turmeric", "2 1/4 teaspoons kosher salt, plus more as needed", "1 pound fresh spring peas in their pods (or about 1 to 1 1/4 cup frozen)", "1/2 teaspoon minced, seeded, minced jalapeño", "1/4 teaspoon fresh lemon juice, plus more as needed", "Freshly ground white pepper", "16 small new potatoes (a little larger than a walnut is what Terry recommends)", "1/2 cup peanut or a vegetable oil", "2 large yellow onions, cut into 1/2-inch-thick slices", "Kosher salt", "Freshly ground black pepper", "Sweet Corn Relish, for serving", "Spicy Spring Green Pea Sauce, for serving"] }, "type": ["https://schema.org/Recipe"] }] };
const testResponseFake = { "items": [{ "properties": { "image": [""], "name": ["Easy honey flapjacks"], "aggregateRating": [{ "properties": { "ratingValue": ["3.833335"], "bestRating": ["5"], "worstRating": ["1"], "ratingCount": ["6"] }, "type": ["http://schema.org/AggregateRating"] }], "author": [{ "properties": { "name": ["GF member meganrosepw"] }, "type": ["http://schema.org/Person"] }], "recipeYield": [" Makes 12 "], "sourceOrganization": ["BBC Good Food"], "accountablePerson": ["BBC Good Food"], "datePublished": ["2020-06-01"], "cookTime": ["PT15M"], "prepTime": ["PT8M"], "totalTime": ["PT23M"], "recipeCategory": ["Afternoon tea", "Treat"], "keywords": ["Flapjacks", "Honey", "Oats", "Sweet treat", "Baking", "Easy", "Vegetarian", "Coffee morning", "Cakes and Bakes", "Everyday", "Casual"], "description": ["Treat yourself to these easy honey flapjacks for elevenses or the afternoon slump. Perfect for picnics, packed lunches and bake sales"], "nutrition": [{ "properties": { "calories": ["302"], "fatContent": ["18g"], "saturatedFatContent": ["10g"], "carbohydrateContent": ["31g"], "sugarContent": ["11g"], "fiberContent": ["2g"], "proteinContent": ["4g"], "sodiumContent": ["0.4g"] }, "type": ["http://schema.org/NutritionInformation"] }], "ingredients": ["225g butter, plus extra for the tin", "75g caster sugar", "4 tbsp honey", "350g porridge oats"], "recipeInstructions": ["Heat the oven to 180C/160C fan/gas 4. Butter and line a 30 x 15cm rectangle tin with baking parchment. Melt the butter, sugar and honey in a pan over a medium heat, stirring frequently until the butter has melted and the mixture is smooth.", "Put the oats in a mixing bowl, then pour over the butter and honey mixture. Stir until all the oats are coated. Tip into the prepared tin, and use a spatula or the back of a spoon to evenly spread out the mixture. Cook for 10-15 mins until lightly golden. Leave to cool in the tin, then remove before cutting into squares."] }, "type": ["http://schema.org/ecipe"] }] };
const testResponse3 = { "items": [{ "properties": {}, "type": ["https://schema.org/WPAdBlock"] }, { "properties": { "url": [""] }, "type": ["https://schema.org/Organization"] }, { "properties": { "name": ["Fried Plantain Chips With Lime Sour Cream and Mango Hot Sauce "], "author": [""], "aggregateRating": [{ "properties": { "ratingValue": ["0"], "bestRating": ["4"], "worstRating": ["0"], "reviewCount": ["0"] }, "type": ["https://schema.org/AggregateRating"] }], "mainEntityOfPage": ["True"], "url": ["https://www.epicurious.com/recipes/food/views/fried-plantain-chips-with-lime-sour-cream-and-mango-hot-sauce"], "image": ["https://assets.epicurious.com/photos/5eea86d764beb86f1288c072/master/pass/fried-plantain-chips-mango-hot-sauce-recipe-061720.jpg"], "description": ["My restaurant, Miss Ollie’s Oakland, has become a staple in the area for many reasons. But the reason that resonates with me the most is that it is a safe space for young, brown, queer folks to hang out with their friends, loved ones, and other members of the LGBTQ+ community. Sharing a bowl of sweet plantain chips is a simple way of bringing people together, helping them to connect and bond. This recipe pairs the chips with homemade hot sauce and a cooling lime sour cream, but each is delicious all by itself. Sometimes it’s the little things that let us know we are loved, like enjoying warm plantain chips with friends."], "recipeYield": ["6 servings"], "ingredients": ["2 tablespoons sunflower oil or other neutral oil", "4 medium shallots, finely chopped", "3 Scotch Bonnet chiles, or to taste, cored, seeded, and finely chopped (see Note)", "3 garlic cloves, chopped", "1 (¼-inch) piece fresh turmeric, peeled and finely chopped, or 1 teaspoon ground turmeric", "¼ cup chopped fresh mango", "¼ teaspoon sea salt, plus more to taste", "¼ cup sugarcane vinegar or apple cider vinegar", "¼ cup orange juice", "1 cup sour cream", "½ teaspoon lime zest", "1 tablespoon fresh lime juice", "1 teaspoon sea salt", "Vegetable oil, for frying", "6 green plantains", "Sea salt and freshly ground black pepper"], "recipeInstructions": ["Preparation                                        Make the mango hot sauce: Heat the oil in a medium pan over low\nheat. Add the shallots, chiles, garlic, turmeric, and mango and sauté\nfor 5 to 7 minutes, until the aromatics start to soften. Add the salt,\nvinegar, and ½ cup water. Stir to combine, then cover and simmer until\nthe aromatics are completely softened and the liquid thickens slightly,\nabout 10 minutes.\n                                                                            Transfer the mixture to a blender and blend until smooth. Stir in the\norange juice and season with more salt to taste. Transfer the hot sauce\nto a resealable glass jar and refrigerate until ready to use. (The hot\nsauce will keep for up to 2 weeks.)\n                                                                            Make the lime sour cream: In a medium bowl, stir together the sour\ncream, lime zest and juice, and salt. Refrigerate until ready to serve.\n                                                                            Make the plantains: Fill a large Dutch oven or heavy-bottomed pot\nabout two-thirds of the way with vegetable oil. Heat over medium heat\nuntil the oil reaches 375°F.\n                                                                            With a very sharp knife, peel the plantains, then slice lengthwise about\n⅛ inch thick. Working in batches, fry the plantains in the hot oil, flipping\noccasionally, until golden brown on both sides, 4 to 6 minutes. Using\na slotted spoon, transfer to a paper towel–lined plate to drain. Season\nwith salt and pepper.\n                                                                            Serve the fried plantains with the mango hot sauce and lime sour\ncream for dipping.\n                                    NoteScotch Bonnet chiles are\npacked with heat. If you are sensitive\nto spice, use a small amount at first\nand add more as desired\n                            \nReprinted with permission from Tasty Pride: 75 Recipes and Stories from the Queer Food Community by Jesse Szewczyk and BuzzFeed's Tasty, copyright © 2020. Published by Clarkson Potter/Publishers, an imprint of Penguin Random House..\nBuy the full book from Amazon.\n                        "], "recipeCategory": ["Appetizer", "snack", "Plantain", "Sour Cream", "Mango", "Lime", "Hot Pepper", "Chile Pepper", "Deep-Fry", "Soy Free", "Peanut Free", "Tree Nut Free", "Wheat/Gluten-Free", "Vegetarian"], "recipeCuisine": ["Central American/Caribbean"] }, "type": ["https://schema.org/Recipe"] }, { "properties": {}, "type": ["https://schema.org/WPAdBlock"] }, { "properties": {}, "type": ["https://schema.org/WPAdBlock"] }, { "properties": { "alternateName": ["Social Sharing"] }, "type": ["https://schema.org/WebPageElement"] }, { "properties": {}, "type": ["https://schema.org/WPAdBlock"] }, { "properties": {}, "type": ["https://schema.org/WPAdBlock"] }, { "properties": {}, "type": ["https://schema.org/WPAdBlock"] }, { "properties": {}, "type": ["https://schema.org/WPAdBlock"] }] };
const testResponse4 = { "items": [] }; // what you get for a site that uses json-ld

describe('MicrodataScraper class', () => {
  let myClass;

  const microdataStub = {
    toJson: sinon.stub(),
  };
  const chtmlStub = {
    html: sinon.stub(),
  };

  before(() => {
    myClass = proxyquire.noCallThru().load('./MicrodataScraper', {
      'microdata-node': microdataStub,
    }).default;
  });

  describe('test response 1 (valid microdata)', () => {
    let microdataScraper;

    before(async () => {
      microdataStub.toJson.returns(testResponse1);
      microdataScraper = new myClass(chtmlStub);
      microdataScraper.testForMetadata();
      microdataScraper.findRecipeItem();
    });

    it('meta should be set to the response', () => {
      microdataScraper.meta.should.eql(testResponse1);
    });

    it('recipeItem should be set to the recipe item in the response', () => {
      microdataScraper.recipeItem.should.eql(testResponse1.items[0].properties);
    });
  });

  describe('test response 3 (valid microdata)', () => {
    let microdataScraper;

    before(async () => {
      microdataStub.toJson.returns(testResponse3);
      microdataScraper = new myClass(chtmlStub);
      microdataScraper.testForMetadata();
      microdataScraper.findRecipeItem();
    });

    it('meta should be set to the response', () => {
      microdataScraper.meta.should.eql(testResponse3);
    });

    it('meta should be set to the response', () => {
      microdataScraper.meta.should.eql(testResponse3);
    });

    it('recipeItem should be set to the recipe item in the response', () => {
      microdataScraper.recipeItem.should.eql(testResponse3.items[2].properties);
    });
  });

  describe('no microdata (json ld)', () => {
    let microdataScraper;

    before(async () => {
      microdataStub.toJson.returns(testResponse4);
      microdataScraper = new myClass(chtmlStub);
      microdataScraper.testForMetadata();
    });

    it('meta should be null', () => {
      (microdataScraper.meta === null).should.be.true;
    });
  });

  describe('valid microdata, but no Recipe schema item, but valid microdata)', () => {
    let microdataScraper;

    before(async () => {
      microdataStub.toJson.returns(testResponseFake);
      microdataScraper = new myClass(chtmlStub);
      microdataScraper.testForMetadata();
      microdataScraper.findRecipeItem();
    });

    it('recipeItem should be null', () => {
      (microdataScraper.recipeItem === null).should.be.true;
    });
  });
});
