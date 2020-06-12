import { Ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs'

export class ShoppingListService{

    ingrediantChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients :Ingredient[] =[
        new Ingredient('Apples',5),
        new Ingredient('Tomatos',10)
    ];

    getIngredients(){
        return this.ingredients.slice();    //return clone
    }

    getIngredient(index:number){
        return this.ingredients[index];    //return clone
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        console.log(this.ingredients);
        this.ingrediantChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){

        let IngredientToCopy:Ingredient;
        for(let newIngredient of ingredients)
        {
            const index = this.ingredients.findIndex(ing => ing.name === newIngredient.name);
            if (index === -1) {
              IngredientToCopy = JSON.parse(JSON.stringify(newIngredient));  
              this.ingredients.push(IngredientToCopy);
            } else {
                this.ingredients[index].amount += newIngredient.amount;
            }
        }

        this.ingrediantChanged.next(this.ingredients.slice());          
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingrediantChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);      
        this.ingrediantChanged.next(this.ingredients.slice());
    }
    
}