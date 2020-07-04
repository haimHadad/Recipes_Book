import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Observable, Subscription } from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  id:number;
  editMode: boolean = false;
  private storeSub:Subscription;
  newName:string ='';
  newDscription='';
  newImgURL='';
  newIngredients:Ingredient[] =[];
  ingredientsCounter:number = 0;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit()  {

    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = (params['id']) != null;
        console.log(this.editMode);
        console.log("ID is : "+this.id)
      }
    );
    this.initForm();
  }

  ngOnDestroy(){
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
    
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([], this.isEmptyIngredientsArray.bind(this));

    if(this.editMode){
      /* const recipe = this.recipeService.getRecipe(this.id) */
      this.storeSub = this.store.select('recipes').pipe(map(recipeState=>{
        return recipeState.recipes.find((recipe,index)=>{
          return index ===this.id;
        })
      })).subscribe(recipe=>{
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
            this.ingredientsCounter++;
          }
        }
      });
  
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, [Validators.required], this.onImageError.bind(this)),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
    this.ingredientsCounter++;
  }

  onSubmit(){
    /* const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
      ); */
      console.log(this.recipeForm);
    if(this.editMode){
      //this.recipeService.updateRecipe(this.id,this.recipeForm.value)
      this.store.dispatch(
        new RecipesActions.UpdateRecipes({
          index:this.id,
          newRecipe:this.recipeForm.value
        })
      );
    }else{
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesActions.AddRecipes(this.recipeForm.value));
    }
    /* this.router.navigate(['../'], {relativeTo: this.route}); //this work fine, with ID */
    this.onCancel();
  }

  onCancel(){
    console.log(this.recipeForm);
    this.router.navigate(['../'], {relativeTo: this.route}); //this work fine, with ID
    
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.ingredientsCounter--;
  }

  onImageError(control: FormControl) : Promise<any> | Observable<any>{
    let imageUrl =control.value; 
    const promise = new Promise<any>((resolve,reject) => {

      this.imageExists(imageUrl, function(exists) {

        if(!exists){
          resolve({'imageNameNotFound': true});
        }else{
          resolve(null);
        }
        }); 


    }); //end of the promise
    
    return promise;
  }


  imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }
    

  isEmptyIngredientsArray(control: FormArray):{[s:string]: boolean}{
    console.log("%No of ingredients--->" + this.ingredientsCounter);
    if(control.length === 0){
      return {'noIngredients' : true }
    }
    return null;
    
  }

 

}
