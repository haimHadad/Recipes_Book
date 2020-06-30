
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl:'./shopping-list-edit.component.html',
    styleUrls:['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy{

    @ViewChild('f', {static:false}) slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItem:Ingredient;

    constructor(private slService: ShoppingListService, 
                private store: Store<fromApp.AppState>){
    }           


    ngOnInit(){
        this.subscription =  this.store.select('shoppingList').subscribe(stateData =>{
            if(stateData.editedIngredientIndex>-1){
                this.editMode = true;
                this.editedItem = stateData.editedIngredient;
                this.slForm.setValue({
                    name:this.editedItem.name,
                    amount:this.editedItem.amount
                });
            }else{
                this.editMode = false; 
            }
        });
        /* this.subscription = this.slService.startedEditing.subscribe(
            (index:number) =>{
                this.editMode = true;
                this.editedItemIndex = index;
                this.editedItem = this.slService.getIngredient(index);
                this.slForm.setValue({
                    name:this.editedItem.name,
                    amount:this.editedItem.amount
                });
            }
        ); */
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();  
        this.store.dispatch(new ShoppingListActions.StopEdit()); 
    }

    onSubmit(form:NgForm){
        
        const ingName = form.value.name;
        const ingAmount = form.value.amount;
        const newIngrediant = new Ingredient(ingName,ingAmount);
        
        if(this.editMode){
            /* this.slService.updateIngredient(this.editedItemIndex, newIngrediant); */
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredients(newIngrediant));

        }else{
            /* this.slService.addIngredient(newIngrediant); */
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngrediant));
        }
        
        this.editMode = false;
        form.reset();
    }

    onClear(){
        this.slForm.reset();
        this.editMode = false; 
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onDelete(){
        /* this.slService.deleteIngredient(this.editedItemIndex); */
        this.store.dispatch(new ShoppingListActions.DeleteIngredients());
        this.editMode=false;
        this.onClear();
    }
}