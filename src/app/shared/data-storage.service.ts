import { OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HeaderService } from '../header/header.service';
import { UserRecipes } from '../recipes/user-recipes.model';

@Injectable({providedIn: 'root'})
export class DataStorageService implements OnInit{


    constructor( private http :HttpClient, private recipeService: RecipeService, private authService: AuthService,
                private headerService: HeaderService ){

    }

    ngOnInit() {

    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        const currentUserEmail = this.authService.user.value.email.split('.').join('');


        this.http.put('https://ng-course-recipe-book-682b9.firebaseio.com//'+currentUserEmail+'.json',recipes).subscribe(
            response =>{
                console.log(response);
                this.headerService.isRecipesSaved.next(true);
            }
        );
    }

    fetchRecipes()
    {
      const currentUserEmail = this.authService.user.value.email.split('.').join('');

            return this.http.get<Recipe[]>(
                'https://ng-course-recipe-book-682b9.firebaseio.com//'+currentUserEmail+'.json'
            ).pipe(

                map(recipes =>{
                  return recipes ?
                   recipes.map(recipe =>{ //for every recipe -> we going to transform
                    return{
                        ...recipe,
                        ingredients: recipe.ingredients? recipe.ingredients:[]
                    }})
                    :
                    []
              }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
                this.headerService.isLoadingRecipes.next(false);
              })
            );

    }

}
