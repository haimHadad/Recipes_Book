import { Component,  OnInit, OnDestroy } from "@angular/core";
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {trigger, state, style, transition, animate, group, keyframes} from '@angular/animations';
import { HeaderService } from 'src/app/header/header.service';

@Component({
    selector:'app-recipe-list',
    templateUrl:'./recipe-list.component.html',
    styleUrls:['./recipe-list.component.scss']

})

export class RecipeListComponent implements OnInit,OnDestroy{

    recipes:Recipe[];
    subscription: Subscription;
    subscriptionListSaved: Subscription;
    recipesSaved:boolean=false;
    subscriptionListLoaded: Subscription;
    recipesLoaded:boolean=false;

    constructor(private recipeService: RecipeService,
                private router: Router,
                private route: ActivatedRoute,
                private headerService: HeaderService ){
    }

   ngOnInit(): void {
       this.subscription = this.recipeService.recipesChanged
       .subscribe(
           (recipes: Recipe[]) =>{
               this.recipes = recipes;
           }
       );
    this.recipes =this.recipeService.getRecipes();

    this.subscriptionListSaved = this.headerService.isRecipesSaved.subscribe(
      (state: boolean) =>{
        this.recipesSaved = state;
      });

    this.subscriptionListLoaded = this.headerService.isLoadingRecipes.subscribe(
        (state: boolean) =>{
          this.recipesLoaded = state;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscriptionListSaved.unsubscribe();
        this.subscriptionListLoaded.unsubscribe();
    }

    onNewRecipe(){
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    deleteSavesMsg(){
      this.headerService.isRecipesSaved.next(false);
    }

}


