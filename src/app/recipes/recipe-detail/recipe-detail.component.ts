import { Component, OnInit } from "@angular/core";
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl:'./recipe-detail.component.html',
    styleUrls:['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit{
    
    recipe:Recipe;
    paramsSubscription: Subscription;
    id:number;

    constructor(private recipeService: RecipeService,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<fromApp.AppState>){}


    ngOnInit() {
      this.route.params.pipe(map(params => {
        return +params['id'];
      }),switchMap(id=>{
        this.id = id;
        return this.store.select('recipes');
      }),
      map(recipeState=>{
        return recipeState.recipes.find((recipe,index)=>{
          return index ===this.id;
        });
      })).subscribe(recipe=>{
        this.recipe = recipe;
      });

      /* this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      ); */
    }

    onAddToShoppingList(){
        //this.recipeService.AddIngredientToShoppingList(this.recipe.ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    }

    onEditRecipe(){
      /* this.router.navigate(['edit'], {relativeTo: this.route}); //this work fine, but we don`t passin ID */
      this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route}); //this work fine, with ID

    }

    onDeleteRecipe(){
      //this.recipeService.deleteRecipe(this.id);
      this.store.dispatch(new RecipesActions.DeleteRecipes(this.id));
      this.router.navigate(['/recipes']); //this work fine, with ID
    }
}