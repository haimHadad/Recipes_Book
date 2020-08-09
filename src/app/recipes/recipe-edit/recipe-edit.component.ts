import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id:number;
  editMode: boolean = false;
  newName:string ='';
  newDscription='';
  newImgURL:string='';
  newIngredients:Ingredient[] =[];
  ingredientsCounter:number = 0;
  backupURL:string='';

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

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

  initForm() {
    let recipeName = '';
    this.newImgURL = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([], this.isEmptyIngredientsArray.bind(this));

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      //recipeImagePath = recipe.imagePath;
      //this.newImgURL = recipeImagePath;
      //this.backupURL = recipeImagePath;
      this.newImgURL = recipe.imagePath;
      this.backupURL = recipe.imagePath;
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
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(this.newImgURL, Validators.required),
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
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
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

  loadImageURL(url:string){

    if(url !== ''){
      this.newImgURL = url;
      this.recipeForm.patchValue({'imagePath': this.newImgURL});
    }
    if(this.editMode===false){
      this.newImgURL = url;
    }
    if(url == ''){
      this.newImgURL = ""+ this.backupURL;
      if(!this.editMode){
        this.recipeForm.patchValue({'imagePath': ''});
      }

    }

  }


}
