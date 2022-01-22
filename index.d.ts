export default function scraper(
  url: string
): Promise<{
  url: string;
  name: string;
  image: string;
  description: string;
  cookTime: string;
  prepTime: string;
  totalTime: string;
  recipeYield: string;
  recipeIngredients: string[];
  recipeInstructions: string[];
  recipeCategories: string[];
  recipeCuisines: string[];
  recipeTypes: string[];
  keywords: string[];
}>;
