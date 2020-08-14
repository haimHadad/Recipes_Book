import { Recipe } from './recipe.model';

export class UserRecipes{


  constructor(private email:string, private recipes: Recipe[]){

  }
}
