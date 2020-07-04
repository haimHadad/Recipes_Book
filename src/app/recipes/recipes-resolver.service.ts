import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { HeaderService } from '../header/header.service';
import * as fromApp from '../store/app.reducer';
import * as recipeActions from './store/recipes.actions';
import { Store } from '@ngrx/store';
import {Actions,ofType} from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService,
                private headerService: HeaderService,
                private store:Store<fromApp.AppState>,
                private actions$:Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        //const recipes = this.recipeService.getRecipes();
        this.headerService.linkButton.next('Recipe');

        return this.store.select('recipes').pipe(
            take(1),
            map((recipesState) =>{
                return recipesState.recipes;
            }),
            switchMap(recipes=>{
                if(recipes.length === 0){
                    this.store.dispatch(new recipeActions.FetchRecipes());
                    return this.actions$.pipe(
                        ofType(recipeActions.SET_RECIPES),
                        take(1));

                }else{
                    return of(recipes)
                }
            })
        );

        

        /* if(recipes.length===0){
            return this.dataStorageService.fetchRecipes();

        }else{
            return recipes;
        } */

        
    }
}