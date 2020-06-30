import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';


@Injectable()
export class RecipeService{
  

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    
       constructor(private slService: ShoppingListService,
                   private store: Store<fromApp.AppState>){}

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
        /* this.slService.addIngredients(ingredients); */
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
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

      deleteAllRecipes(){
          this.recipes = [];
          this.recipesChanged.next(this.recipes.slice());
      }
}