import { Component,  OnInit, OnDestroy } from "@angular/core";
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


@Component({
    selector:'app-recipe-list',
    templateUrl:'./recipe-list.component.html',
    styleUrls:['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit,OnDestroy{
    
    recipes:Recipe[];
    subscription: Subscription;

    constructor(private recipeService: RecipeService,
                private router: Router,
                private route: ActivatedRoute,
                private store: Store<fromApp.AppState>){
    }

   ngOnInit(): void {
       //this.subscription = this.recipeService.recipesChanged
       this.subscription = this.store.select('recipes')
       .pipe(map((recipesState=>{
           return recipesState.recipes;
       })))
       .subscribe(
           (recipes: Recipe[]) =>{
               this.recipes = recipes;
           }
       );
    /* this.recipes =this.recipeService.getRecipes(); */
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onNewRecipe(){
        this.router.navigate(['new'], {relativeTo: this.route});
    }

}


