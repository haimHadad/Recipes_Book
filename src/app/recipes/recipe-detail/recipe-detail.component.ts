import { Component, OnInit } from "@angular/core";
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-detail',
    templateUrl:'./recipe-detail.component.html',
    styleUrls:['./recipe-detail.component.scss']
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
