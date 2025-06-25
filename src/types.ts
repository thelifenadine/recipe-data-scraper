export interface ScrapingOptions {
  printToConsole?: boolean;
}

// JSON-LD Schema.org Recipe structure
export interface JsonLdRecipe {
  "@context"?: string;
  "@type": "Recipe";
  "@graph"?: JsonLdRecipe[];
  name?: string;
  image?: string | JsonLdImageObject | JsonLdImageObject[];
  description?: string;
  author?: JsonLdPerson | JsonLdOrganization;
  publisher?: JsonLdOrganization;
  datePublished?: string;
  dateCreated?: string;
  prepTime?: string; // ISO 8601 duration format (PT15M)
  cookTime?: string; // ISO 8601 duration format (PT40M)
  totalTime?: string; // ISO 8601 duration format (PT17H25M)
  recipeYield?: string | string[];
  recipeIngredient?: string[];
  recipeInstructions?: string | JsonLdHowToStep[] | string[];
  recipeCategory?: string | string[];
  recipeCuisine?: string | string[];
  keywords?: string | string[];
  aggregateRating?: JsonLdAggregateRating;
  nutrition?: JsonLdNutritionInformation;
  video?: JsonLdVideoObject;
  review?: JsonLdReview[];
  [key: string]: any; // Allow additional schema.org properties
}

export interface JsonLdImageObject {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface JsonLdHowToStep {
  "@type": "HowToStep";
  text: string;
}

export interface JsonLdPerson {
  "@type": "Person";
  name: string;
  image?: string;
  sameAs?: string;
}

export interface JsonLdOrganization {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: JsonLdImageObject;
  sameAs?: string[];
}

export interface JsonLdAggregateRating {
  "@type": "AggregateRating";
  ratingValue: string | number;
  ratingCount: string | number;
  reviewCount?: string | number;
  bestRating?: string;
  worstRating?: string;
  itemReviewed?: string;
}

export interface JsonLdNutritionInformation {
  "@type": "NutritionInformation";
  calories?: string;
  carbohydrateContent?: string;
  cholesterolContent?: string;
  fatContent?: string;
  fiberContent?: string;
  proteinContent?: string;
  saturatedFatContent?: string;
  servingSize?: string;
  sodiumContent?: string;
  sugarContent?: string;
  transFatContent?: string;
  unsaturatedFatContent?: string;
}

export interface JsonLdVideoObject {
  "@context": string;
  "@type": "VideoObject";
  name: string;
  description: string;
  uploadDate: string;
  duration: string;
  thumbnailUrl: string;
  publisher: JsonLdOrganization;
  embedUrl: string;
}

export interface JsonLdReview {
  "@type": "Review";
  datePublished: string;
  reviewBody: string;
  reviewRating: {
    "@type": "Rating";
    worstRating: string;
    bestRating: string;
    ratingValue?: number;
  };
  author: JsonLdPerson;
}

// Microdata structure
export interface MicrodataResponse {
  items: MicrodataItem[];
}

export interface MicrodataItem {
  type: string[]; // e.g., ["https://schema.org/Recipe"]
  properties: MicrodataRecipeProperties;
}

export interface MicrodataRecipeProperties {
  name?: string[];
  image?: string[];
  description?: string[];
  author?: MicrodataNestedObject[];
  recipeYield?: string[];
  totalTime?: string[];
  prepTime?: string[];
  cookTime?: string[];
  recipeIngredient?: string[];
  ingredients?: string[]; // Alternative property name
  recipeInstructions?: string[];
  recipeCategory?: string[];
  recipeCuisine?: string[];
  keywords?: string[];
  aggregateRating?: MicrodataNestedObject[];
  nutrition?: MicrodataNestedObject[];
  url?: string[];
  datePublished?: string[];
  sourceOrganization?: string[];
  accountablePerson?: string[];
  [key: string]: any; // Allow additional microdata properties
}

export interface MicrodataNestedObject {
  type: string[];
  properties: {
    [key: string]: any;
  };
}

// Raw recipe data before transformation (union of both formats)
export interface RawRecipeData {
  url?: string;
  name?: string | string[];
  image?: string | string[] | { url: string; [key: string]: any };
  description?: string | string[];
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  recipeYield?: string | string[];
  recipeIngredients?: string | string[];
  recipeInstructions?: string | string[];
  recipeCategories?: string | string[];
  recipeCuisines?: string | string[];
  recipeTypes?: string | string[];
  keywords?: string | string[];
  [key: string]: any; // Allow additional properties from scraped data
}

// Final recipe data after transformation
export interface Recipe {
  url?: string;
  name?: string;
  image?: string;
  description?: string;
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  cookTimeOriginalFormat?: string;
  prepTimeOriginalFormat?: string;
  totalTimeOriginalFormat?: string;
  recipeYield?: string;
  recipeIngredients?: string[];
  recipeInstructions?: string[];
  recipeCategories?: string[];
  recipeCuisines?: string[];
  recipeTypes?: string[];
  keywords?: string[];
}

export interface RecipeWithUrl extends Recipe {
  url: string;
}

export interface ScrapedData {
  [key: string]: any;
}

export interface TransformerFunction {
  (value: any, key?: string): any;
}

export interface TransformerMap {
  [key: string]: TransformerFunction;
}

// Scraper-specific types
export interface ScraperMeta {
  jsonld: JsonLdRecipe | JsonLdRecipe[];
  microdata: MicrodataResponse;
}

export interface ScraperResult {
  jsonld: JsonLdRecipe;
  microdata: MicrodataRecipeProperties;
}

// Union type for any scraped raw data
export type AnyScrapedData = JsonLdRecipe | MicrodataRecipeProperties | RawRecipeData; 