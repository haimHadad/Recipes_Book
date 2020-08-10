import { Component, OnInit } from "@angular/core";
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {trigger, state, style, transition, animate, group, keyframes} from '@angular/animations';

@Component({
    selector: 'app-recipe-detail',
    templateUrl:'./recipe-detail.component.html',
    styleUrls:['./recipe-detail.component.scss'],
    animations: [
      trigger('ShowDetails', [
        state('normal', style({
          opacity:1,
          transform: 'translateX(0)'
        })),

        transition('void => *', [
          animate(1000,keyframes([
            style({
              transform: 'translateX(100px)',
              opacity:0,
              offset:0
            }),
            style({
              transform: 'translateX(75px)',
              opacity:0.2,
              offset:0.1
            }),
            style({
              transform: 'translateX(50px)',
              opacity:0.5,
              offset:0.4
            }),
            style({
              transform: 'translateX(25px)',
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
              transform: 'translateX(50px)',
              opacity:0
            }))
          ])

        ])
      ])

    ]
})

export class RecipeDetailComponent implements OnInit{

    recipe:Recipe;
    paramsSubscription: Subscription;
    id:number;
    IngAddedToSL: boolean = false;

    constructor(private recipeService: RecipeService,
                private route: ActivatedRoute,
                private router: Router){}


    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
    }

    onAddToShoppingList(){
        this.recipeService.AddIngredientToShoppingList(this.recipe.ingredients);
        this.IngAddedToSL = true;
    }

    onEditRecipe(){
      /* this.router.navigate(['edit'], {relativeTo: this.route}); //this work fine, but we don`t passin ID */
      this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route}); //this work fine, with ID

    }

    onDeleteRecipe(){
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']); //this work fine, with ID
    }

    closeIngAddedToSlMsg(){
      this.IngAddedToSL = false;
    }
}
