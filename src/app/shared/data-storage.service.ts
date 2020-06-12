import { OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService implements OnInit{
    
    
    constructor( private http :HttpClient, private recipeService: RecipeService, private authService: AuthService ){

    }

    ngOnInit() {

    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-682b9.firebaseio.com//recipes.json',recipes).subscribe(
            response =>{
                console.log(response);
            }
        );
    }

    fetchRecipes()
    {
        
    
        
            return this.http.get<Recipe[]>(
                'https://ng-course-recipe-book-682b9.firebaseio.com//recipes.json'
            ).pipe( 
                map(recipes =>{
                return recipes.map(recipe =>{ //for every recipe -> we going to transform
                    return{
                        ...recipe,
                        ingredients: recipe.ingredients? recipe.ingredients:[]
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }));
    
    }

}