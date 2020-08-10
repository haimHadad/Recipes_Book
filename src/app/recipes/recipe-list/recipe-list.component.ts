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
    styleUrls:['./recipe-list.component.scss'],
    animations: [
      trigger('confirmation', [
        state('normal', style({
          opacity:1,
          transform: 'translateX(0)'
        })),

        transition('void => *', [
          animate(1000,keyframes([
            style({
              transform: 'translateX(75px)',
              opacity:0,
              offset:0
            }),
            style({
              transform: 'translateX(40px)',
              opacity:0.5,
              offset:0.3
            }),
            style({
              transform: 'translateX(10px)',
              opacity:1,
              offset:0.8
            }),
            style({
              transform: 'translateX(0px)',
              opacity:1,
              offset:1
            })
          ]))
        ]),

        transition('* => void', [
          group([
            animate(300,
              style({
                color: 'gray',
              })),
            animate(800,
            style({
              transform: 'translateX(100px)',
              opacity:0
            }))
          ])

        ])
      ])
    ]

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


