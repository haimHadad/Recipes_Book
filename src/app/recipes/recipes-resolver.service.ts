import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { HeaderService } from '../header/header.service';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, private headerService: HeaderService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipes();
        this.headerService.linkButton.next('Recipe');
        if(recipes.length===0){
            return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }

        
    }
}