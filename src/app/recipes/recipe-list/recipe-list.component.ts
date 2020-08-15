import { Component,  OnInit, OnDestroy } from "@angular/core";
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/header/header.service';
import { confirmMsgSaveError,recipeListEnterLeave } from './recipe-list-animations';

@Component({
    selector:'app-recipe-list',
    templateUrl:'./recipe-list.component.html',
    styleUrls:['./recipe-list.component.scss'],
    animations: [confirmMsgSaveError,recipeListEnterLeave]


})

export class RecipeListComponent implements OnInit,OnDestroy{

    recipes:Recipe[];
    subscription: Subscription;
    subscriptionListSaved: Subscription;
    recipesSaved:boolean=false;
    subscriptionListLoaded: Subscription;
    recipesLoaded:boolean=false;
    recipesUpdated:boolean=false;
    subscriptionRecipeChanged:Subscription;
    noRecipesAfterLoading:boolean = false;

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
               if(recipes.length ===0){
                 this.noRecipesAfterLoading = true;
               }else{
                this.noRecipesAfterLoading = false;
               }
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

    this.subscriptionRecipeChanged = this.recipeService.recipeUpdated.subscribe(
      (state:boolean)=>{
        this.recipesUpdated = state;
      }
    );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscriptionListSaved.unsubscribe();
        this.subscriptionListLoaded.unsubscribe();
        this.subscriptionRecipeChanged.unsubscribe();
    }

    onNewRecipe(){
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    deleteSavesMsg(){
      this.headerService.isRecipesSaved.next(false);
      this.recipeService.recipeUpdated.next(false);
    }

    deleteNoRecipesMsg(){
      this.noRecipesAfterLoading = false;
    }

}


