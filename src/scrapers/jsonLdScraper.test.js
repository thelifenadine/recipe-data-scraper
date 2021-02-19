import proxyquire from 'proxyquire';
import { should } from "chai";
import sinon from 'sinon';
should();

const testResponse1 = [{ "@context": "https://schema.org", "@graph": [{ "@type": "Recipe", "name": "Pain au Levain", "keywords": "Crusty bread, Rye, Sourdough, Overnight, Dairy-free, Vegan", "description": "Though it begins with sourdough starter, this lovely bread's rich flavor is only mildly tangy. With its wonderfully open crumb, it's great alongside soup, stew, or pasta; and also makes a delicious sandwich. Bonus: This loaf uses no commercially produced yeast, for those of you who enjoy baking with starter alone.", "recipeYield": "2 loaves", "prepTime": "PT15M", "datePublished": "February 6, 2017 at 7:00pm", "totalTime": "PT17H25M", "cookTime": "PT40M", "recipeIngredient": ["1 1/4 cups (149g) King Arthur Unbleached All-Purpose Flour", "1/3 cup (74g) room-temperature (70°F) water", "1/8 cup (28g) ripe (fed) sourdough starter", "2 cups + 2 tablespoons (482g) water 75°F to 80°F", "5 1/4 cups (631g) King Arthur Unbleached All-Purpose Flour", "1/2 cup (50g) King Arthur Organic Pumpernickel Flour or rye flour", "1 tablespoon salt"], "recipeInstructions": "To make the levain: Knead together the levain ingredients to make a smooth, stiff dough. Place the levain in a lightly oiled bowl, cover it, and allow it to ferment overnight at room temperature (65°F to 75°F). It should take the levain about 12 hours to mature. The mature levain will have doubled in size and be domed on top, or just beginning to sink in the middle., To make the dough: Tear the levain into small pieces and add it to the dough water. Add the remaining ingredients and mix until there are no remaining dry pockets of flour. If mixing by hand, use a dough scraper to blend the dough and break down the levain. In a stand mixer, mix the dough on the lowest speed for 2 minutes using the hook attachment., Cover the bowl and allow the dough to rest for 30 minutes., Knead the dough by hand for 3 minutes, or in a stand mixer for 1 1/2 minutes on speed 2. The dough will be quite sticky., Allow the dough to rise for 60 minutes in an oiled and covered bowl., Give the dough a fold and return it to the bowl to rise for another 60 minutes., Gently deflate the dough and divide it in half. Pre-shape it into two rounds. Place the rounds seam side up on a floured surface, covered well. Let the rounds relax for 20 minutes., Shape the loaves into either a bâtard (football) shape or a round (depending on how you plan to bake it)., Cover the loaves with greased plastic wrap and allow them to rise on lightly greased parchment for approximately 2 hours. Loaves can also rise in an oiled Dutch oven or cloche; or seam side up in a well-floured brotform, or a bowl lined with a very well-floured cloth., Alternatively, refrigerate the loaves after shaping for up to 16 hours before baking., Preheat the oven to 450°F. If you’re planning to bake on a stone with steam, preheat the stone and a cast iron frying pan on the shelf below the stone for 60 minutes., Score the loaves with one long angled cut down the center of the loaf, and spray or brush them with water., When baking on a stone, slide the parchment and loaf onto the hot stone. Pour 1 1/2 cups boiling water into the cast iron frying pan. Be sure to wear good oven mitts to prevent a steam burn., If baking in a Dutch oven or cloche, remove the lid after 20 minutes and allow the loaf to finish baking in a dry oven., Bake the bread for 35 to 40 minutes. The loaves should be a rich brown, firm on the sides, and sound hollow when tapped on the bottom. Their internal temperature should be 195°F., Remove the loaves from the oven, and cool them on a rack. Store at room temperature, lightly wrapped, for a day or so; freeze for longer storage.", "author": { "@type": "Organization", "name": "King Arthur Flour", "url": "https://www.kingarthurflour.com/", "logo": { "@type": "ImageObject", "url": "https://www.kingarthurflour.com/themes/custom/kaf_nextgenweb/images/logo--full.svg" } }, "image": { "@type": "ImageObject", "url": "https://www.kingarthurflour.com/sites/default/files/recipe_legacy/9021-3-large.jpg" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.30", "ratingCount": "42" } }] }];
const testResponse2 = [[{ "@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "item": { "@id": "https://www.marthastewart.com/", "name": "Home", "image": null } }, { "@type": "ListItem", "position": 2, "item": { "@id": "https://www.marthastewart.com/1509043/food-cooking", "name": "Food &amp; Cooking", "image": null } }, { "@type": "ListItem", "position": 3, "item": { "@id": "https://www.marthastewart.com/1505788/recipes", "name": "Recipes", "image": null } }, { "@type": "ListItem", "position": 4, "item": { "@id": "https://www.marthastewart.com/1520452/recipes-ingredient", "name": "Recipes by Ingredient", "image": null } }, { "@type": "ListItem", "position": 5, "item": { "@id": "https://www.marthastewart.com/1513726/meat-poultry-recipes", "name": "Meat &amp; Poultry Recipes", "image": null } }, { "@type": "ListItem", "position": 6, "item": { "@id": "https://www.marthastewart.com/1505014/beef-recipes", "name": "Beef Recipes", "image": null } }] }, { "@context": "http://schema.org", "@type": "Recipe", "mainEntityOfPage": "https://www.marthastewart.com/332439/pan-seared-steak", "name": "Pan-Seared Steak", "image": { "@type": "ImageObject", "url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-750%2Fd24%2Fpan-seared-steak-d102787%2Fpan-seared-steak-d102787_horiz.jpg%3Fitok%3DYbJjMKca", "width": 750, "height": 421, "caption": "pan-seared steak" }, "datePublished": "2011-02-10T10:59:33.000Z", "description": "With the right steak, a good cast-iron or other ovenproof skillet, your kitchen can be the best steakhouse in town.", "prepTime": "PT15M", "cookTime": null, "totalTime": "PT30M", "recipeIngredient": ["1 tablespoon vegetable oil", "1 boneless rib-eye or New York strip (shell) steak, 1 1/2 to 2 pounds and 2 1/2 inches thick, room temperature", "Coarse salt and cracked (butcher-grind) pepper", "<a href=\"https://www.marthastewart.com/340928/steak-butter\">Steak Butter</a>"], "recipeInstructions": [{ "@type": "HowToStep", "text": "Preheat oven to 400. Heat oil in a large cast-iron or other ovenproof skillet (not a nonstick) over medium-high until it begins to smoke. Pat steak dry with paper towels. Season each side with 1 teaspoon coarse salt and 1 teaspoon cracked pepper." }, { "@type": "HowToStep", "text": "Cook steak in skillet over medium-high heat until a dark crust has formed, 5 to 7 minutes per side (reduce heat if meat is browning too quickly). Holding steak with tongs, quickly brown all edges, turning as necessary; lay steak flat in skillet." }, { "@type": "HowToStep", "text": "Transfer skillet to oven. Roast until an instant-read thermometer inserted in the thickest part of steak registers desired doneness, 5 to 15 minutes. Transfer to a plate; spread with 1 tablespoon Steak Butter. Cover loosely with aluminum foil, and let rest 5 to 10 minutes (temperature will then rise another 5 to 10 degrees). Slice across the grain; serve with remaining Steak Butter. Cover and refrigerate any leftovers, up to 2 days." }], "recipeCategory": ["Food &amp; Cooking", "Recipes by Ingredient", "Meat &amp; Poultry Recipes", "Beef Recipes"], "recipeCuisine": [], "author": { "@type": "Organization", "name": "Martha Stewart" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": 3.09411764705882, "ratingCount": 85, "itemReviewed": "Pan-Seared Steak", "bestRating": "5", "worstRating": "1" }, "nutrition": { "@type": "NutritionInformation", "calories": "599 g", "carbohydrateContent": null, "cholesterolContent": null, "fatContent": "50 g", "fiberContent": null, "proteinContent": "35 g", "saturatedFatContent": null, "servingSize": null, "sodiumContent": null, "sugarContent": null, "transFatContent": null, "unsaturatedFatContent": null }, "review": [{ "@type": "Review", "datePublished": "2019-05-12T14:56:01+00:00", "reviewBody": "As a chef that has worked in restaurants in Chicago, Naples, Italy, and points unknown, I can say that this is pretty much the way that we finished our steaks, and it is the method that I teach to my students. We would get our grill marks, throw it in the oven... perfect every time. This method works... Full Stop.\nKeep the faith, and keep cooking.", "reviewRating": { "@type": "Rating", "worstRating": "1", "bestRating": "5", "ratingValue": 5 }, "author": { "@type": "Person", "name": "Anonymous", "image": null, "sameAs": "" } }, { "@type": "Review", "datePublished": "2018-09-23T21:22:06+00:00", "reviewBody": "This is a fine recipe if you want to make shoes for your children instead of delicious steak.  Even halving the cook time resulted in a ruined steak that was the consistency of boiled shoe leather.  Don’t waste a good steak on this recipe.", "reviewRating": { "@type": "Rating", "worstRating": "1", "bestRating": "5", "ratingValue": 1 }, "author": { "@type": "Person", "name": "Anonymous", "image": null, "sameAs": "" } }, { "@type": "Review", "datePublished": "2011-06-12T00:05:12+00:00", "reviewBody": "i haven't made a steak for 4 years, was never very good at it because i rarely eat red meat. this recipe is easy, and retains all the juices of the meat. we seared 2 thick boneless ribeye 3 min per side, then roasted for 5 min. a perfect medium rare. mmm. steaks were local, purchased at whole foods, very fresh.", "reviewRating": { "@type": "Rating", "worstRating": "1", "bestRating": "5" }, "author": { "@type": "Person", "name": "Anonymous", "image": null, "sameAs": "" } }, { "@type": "Review", "datePublished": "2009-12-11T11:15:14+00:00", "reviewBody": "Follow this recipe to the \"T\". Yes, it will smoke up your house, but your man will propose to you after tasting this steak. This goes in my arsenal for persuading him to do what I want ; )", "reviewRating": { "@type": "Rating", "worstRating": "1", "bestRating": "5" }, "author": { "@type": "Person", "name": "Anonymous", "image": null, "sameAs": "" } }, { "@type": "Review", "datePublished": "2009-09-16T23:57:52+00:00", "reviewBody": "The ingredients listed on the grocery list for this group of 5 meals includes spinach and grapes... wondering if they meant to serve a spinach salad with the steak?", "reviewRating": { "@type": "Rating", "worstRating": "1", "bestRating": "5" }, "author": { "@type": "Person", "name": "Anonymous", "image": null, "sameAs": "" } }, { "@type": "Review", "datePublished": "2009-01-23T22:05:22+00:00", "reviewBody": "This isn't exactly a 5 ingredient dinner...  The \"grocery bags\" concept doesn't take into account that most people like to have side dishes of some kind with dinner.", "reviewRating": { "@type": "Rating", "worstRating": "1", "bestRating": "5" }, "author": { "@type": "Person", "name": "Anonymous", "image": null, "sameAs": "" } }], "video": { "@context": "http://schema.org", "@type": "VideoObject", "name": "Pan-Seared Steak Video", "description": "With the right cut of meat, a good cast-iron or ovenproof skillet will turn your kitchen into the best steakhouse in town.", "uploadDate": "2018-01-24T21:15:25.000Z", "duration": "PT1M2.187S", "thumbnailUrl": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcf-images.us-east-1.prod.boltdns.net%2Fv1%2Fstatic%2F5985631785001%2F79c4e98c-44ed-4863-93a3-5752b47e2a45%2F504a5749-5618-4a17-a997-a9cb20895a96%2F160x90%2Fmatch%2Fimage.jpg", "publisher": { "@type": "Organization", "name": "Martha Stewart", "url": "https://www.marthastewart.com", "logo": { "@type": "ImageObject", "url": "https://www.marthastewart.com/img/logo.png", "width": 209, "height": 60 }, "sameAs": ["https://www.facebook.com/marthastewart/", "https://twitter.com/marthaliving/", "https://www.pinterest.com/marthastewart/", "https://www.instagram.com/marthastewart/", "https://www.youtube.com/user/marthastewart/"] }, "embedUrl": "https://players.brightcove.net/5985631785001/default_default/index.html?videoId=5991067967001" } }]];
const testResponse3 = [{"@context":"http://schema.org","@type":"Recipe","name":"Lemon Meringue Pie","image":"https://assets.bonappetit.com/photos/5d9f645147ff4500091082ad/16:9/w_1000,c_limit/1119-Pies-Lemon-Meringue.jpg","author":{"@type":"Person","name":"Chris Morocco"},"publisher":{"@type":"Organization","name":"Bon Appétit","logo":{"@type":"ImageObject","url":"https://www.bonappetit.com/images/logo-foodculture-tablet@1x.png","width":322,"height":56}},"datePublished":"2019-10-15T04:00:00.000-04:00","dateCreated":"2020-04-24T18:36:00.000-04:00","description":"A sharp lemon filling, sweet-and-salty meringue, and shatteringly crisp crust combine to make a balanced update to this classic.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.21","reviewCount":"20"},"recipeYield":"8 servings","recipeIngredient":["2 Tbsp. granulated sugar","2 tsp. Diamond Crystal or 1 tsp. Morton kosher salt","2⅔ cups all-purpose flour, plus more for dusting","1½ cups (3 sticks) chilled unsalted butter, cut into ½\" pieces","1 cup sugar","⅓ cup cornstarch","2 large eggs","4 large egg yolks","Zest of 4 lemons","1 cup fresh lemon juice","1 tsp. kosher salt","3 Tbsp. chilled unsalted butter","4 large egg whites","¾ cup sugar","½ tsp. kosher salt","¼ tsp. cream of tartar"],"recipeInstructions":[{"@type":"HowToStep","text":"Crust: Whisk sugar, salt, and 2⅔ cups flour in a large bowl. Add butter and, using your fingers, smash each piece into a thin disk. Take your time doing this and don’t feel compelled to break butter into even smaller pieces. Drizzle ⅔ cup ice water over, dispersing it as widely as possible, and mix with a rubber spatula to bring mixture together into a shaggy mass."},{"@type":"HowToStep","text":"Turn dough out onto a surface and work together with your hands, pushing and flattening until dough holds together when squeezed in your palm but some streaks of dry flour are still visible. Divide dough into 2 portions."},{"@type":"HowToStep","text":"Flatten 1 portion of dough into an 8\"-diameter disk. Cut into quarters, stack pieces on top of one another, and flatten dough with a rolling pin to about half of its original height. At this point dough should hold together with no dry spots remaining, and have nice big flakes of butter showing. Use a bench scraper or a large knife to clean any clingy bits of dough from surface. Dust surface with flour, then dust top of dough with flour. Roll out to a ¼\"–⅜\"-thick round. Wrap dough around rolling pin and transfer to a standard 9\"-diameter pie dish. Unfurl into dish, then lift edges and allow dough to slump down into dish. Trim overhang to an even 1\" (there will be some excess). Fold overhang under and crimp as desired. Cover and chill until very cold, at least 1 hour and up to 12 hours (cover tightly if chilling longer than 1 hour). Repeat process with remaining dough and another pie dish. Or form into a 1½\"-thick disk, wrap in plastic, and chill up to 3 days (or freeze up to 1 month)."},{"@type":"HowToStep","text":"Place a rack in middle of oven; preheat oven to 400°. Lay 2 sheets of parchment paper over dough and fill with pie weights or dried beans (they should fill the dish). Set on a foil-lined rimmed baking sheet (this will keep any butter drips from smoking up your oven). Bake until edges are golden brown and bottom is opaque (carefully lift parchment to check), 30–35 minutes. Remove from oven; reduce oven temperature to 300°. Lift out parchment and weights. Bake crust until evenly chestnut brown all over, 10–15 minutes. If baking both crusts, turn oven dial back up to 400° and let oven preheat; repeat with remaining crust."},{"@type":"HowToStep","text":"Filling: Whisk sugar and cornstarch in a large saucepan to combine. Add eggs and egg yolks and whisk vigorously, making sure to get into corners of pan, until smooth and pale. Whisk in lemon zest and juice, salt, and 1½ cups water."},{"@type":"HowToStep","text":"Place saucepan over medium heat and bring to a simmer, whisking often and making sure to get into corners of pan, 8–10 minutes (mixture should be bubbling and thickened). Reduce heat and continue to simmer, whisking constantly, 3 minutes. Let cool 5 minutes, whisking every minute."},{"@type":"HowToStep","text":"Add butter to filling and whisk until melted and fully incorporated. Scrape filling into pie crust; smooth surface. Chill until cold and set, at least 2 hours and up to 3 days."},{"@type":"HowToStep","text":"Assembly: Combine egg whites, sugar, salt, and cream of tartar in the bowl of a stand mixer or another large heatproof bowl; set over a large saucepan filled with 1\" simmering water (bowl shouldn’t touch the water). Heat, stirring constantly, until sugar is dissolved and mixture is warm to the touch, about 4 minutes."},{"@type":"HowToStep","text":"Fit bowl onto mixer fitted with whisk attachment (or use an electric mixer) and beat on medium-high speed until meringue is more than tripled in volume and medium peaks form, about 4 minutes. Transfer to a piping bag fitted with a large round tip (or a resealable plastic bag will work—just snip off a corner after bag is filled). Pipe meringue over filling and toast with a kitchen torch or under the broiler."},{"@type":"HowToStep","text":"Do Ahead: Pie (without meringue) can be made 2 days ahead. Keep chilled."}],"nutrition":""}];

describe('JsonLdScraper class', () => {
  let myClass;

  const loggerStub = sinon.stub();
  const chtmlStub = sinon.stub();
  const getMeta = json => json.length > 1 ? json : json[0];

  before(() => {
    myClass = proxyquire.noCallThru().load('./JsonLdScraper', {
      '../utils/logger': loggerStub,
    }).default;
  });

  describe('test response 1: testForMetadata', () => {
    let jsonLdScraper;
    let testMeta;

    before(async () => {
      testMeta = getMeta(testResponse1);

      const testChtml = [{
        children: [{ data: JSON.stringify(testMeta), type: 'k' }, {}]
      }];

      chtmlStub.returns(testChtml);
      jsonLdScraper = new myClass(chtmlStub);
      jsonLdScraper.testForMetadata();
    });

    it('meta should be set', () => {
      jsonLdScraper.meta.should.eql(testMeta);
    });
  });


  describe('test response 1: JSON.parse error', () => {
    let jsonLdScraper;
    let testMeta;

    before(async () => {
      loggerStub.reset();
      testMeta = getMeta(testResponse1);

      const testChtml = [{
        children: [{ data: testMeta, type: 'k' }, {}]
      }];

      chtmlStub.returns(testChtml);
      jsonLdScraper = new myClass(chtmlStub);
      jsonLdScraper.testForMetadata();
    });

    it('invokes the logger with the json-ld errors', () => {
      loggerStub.getCall(0).firstArg.should.eql('JsonLd: error parsing the json data');
      loggerStub.getCall(1).firstArg.should.eql('Error: No JSON-LD valid script tags present on page');
    });

    it('meta should not be set', () => {
      (jsonLdScraper.meta === null).should.be.true;
    });
  });

  describe('test response 1: no data', () => {
    let jsonLdScraper;

    before(async () => {
      const testChtml = [{
        nodata: [{ nope: '', type: 'k' }, {}]
      }];

      chtmlStub.returns(testChtml);
      jsonLdScraper = new myClass(chtmlStub);
      jsonLdScraper.meta = null;
      jsonLdScraper.testForMetadata();
    });

    it('meta should be null', () => {
      (jsonLdScraper.meta === null).should.be.true;
    });
  });

  // this.meta['@graph']
  describe('test response 1', () => {
    let jsonLdScraper;

    before(async () => {
      jsonLdScraper = new myClass(chtmlStub);
      jsonLdScraper.meta = getMeta(testResponse1);
      jsonLdScraper.findRecipeItem();
    });

    it('recipeItem should be set to the recipe item in the response', () => {
      jsonLdScraper.recipeItem['@type'].should.eql('Recipe');
    });
  });

  // this.meta
  describe('test response 2', () => {
    let jsonLdScraper;

    before(async () => {
      jsonLdScraper = new myClass(chtmlStub);
      jsonLdScraper.meta = getMeta(testResponse2);
      jsonLdScraper.findRecipeItem();
    });

    it('recipeItem should be set to the recipe item in the response', () => {
      jsonLdScraper.recipeItem['@type'].should.eql('Recipe');
    });
  });

  // (this.meta['@type'] === 'Recipe')
  describe('test response 3', () => {
    let jsonLdScraper;

    before(async () => {
      jsonLdScraper = new myClass(chtmlStub);
      jsonLdScraper.meta = getMeta(testResponse3);
      jsonLdScraper.findRecipeItem();
    });

    it('recipeItem should be set to the recipe item in the response', () => {
      jsonLdScraper.recipeItem['@type'].should.eql('Recipe');
    });
  });
});
