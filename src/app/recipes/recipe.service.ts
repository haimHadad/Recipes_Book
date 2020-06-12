import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
  

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];/* = [
        new Recipe(
            'Kibbeh',
            'Fried kibbeh raas (nabulsi kibbeh)',
            'https://upload.wikimedia.org/wikipedia/commons/8/88/Kibbeh3.jpg',
            [
                new Ingredient('Meat',1),
                new Ingredient('Bulgur',2)

            ]),
        new Recipe(
            'Entrecote',
            'Well Done Cooking',
            'https://sealife.co.il/en/wp-content/uploads/2016/01/antri.jpg',
            [
                new Ingredient('Meat',2),
                new Ingredient('Garlic',1)

            ]),
        new Recipe(
            'Pasta',
            'Spaghetti With Mushroom Tomato Sauce',
            'https://www.errenskitchen.com/wp-content/uploads/2015/10/Spaghetti-With-Mushroom-Tomato-Sauce-feature.jpg',
            [
                new Ingredient('Pasta',1),
                new Ingredient('Tomato',3)
            ]),
        new Recipe(
            'Mordok',
            'Vine leaves filled with meat and rice',
            'https://vegansontop.co.il/wp-content/uploads/gefen-cooked5.jpg',
            [
                new Ingredient('Grapes Leaf',10),
                new Ingredient('Meat',3)

            ]),
        new Recipe(
            'Moroccan Fishes',
        'Spicy fish in tomato sauce with gamba',
        'https://www.srugim.co.il/wp-content/uploads/2019/01/%D7%9E%D7%A0%D7%AA-%D7%93%D7%92%D7%99%D7%9D-%D7%97%D7%A8%D7%99%D7%A4%D7%99%D7%9D-%D7%A6%D7%99%D7%9C%D7%95%D7%9D-%D7%99%D7%97%D7%A6-%D7%91%D7%A8%D7%A9%D7%AA-%D7%A7%D7%A4%D7%94-%D7%92%D7%A8%D7%92-Custom-e1548241239577.jpg',
            [
                new Ingredient('Salmon',3),
                new Ingredient('Pepper',5)

            ]),
       ];  //array of recipes  */

       constructor(private slService: ShoppingListService){}

       setRecipes(newRecipes:Recipe[]){
        this.recipes = newRecipes;
        this.recipesChanged.next(this.recipes.slice());
       }

       getRecipes(){
           return this.recipes.slice();//return clone
       }

       getRecipe(id: number) {
            return this.recipes[id];
      }

       AddIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
       }

       addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
       }

       updateRecipe(index: number, newrecipe: Recipe){
        this.recipes[index] = newrecipe; 
        this.recipesChanged.next(this.recipes.slice());
       }

       deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}