
import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl:'./shopping-list-edit.component.html',
    styleUrls:['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy{

    @ViewChild('f', {static:false}) slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex:number;
    editedItem:Ingredient;

    constructor(private slService: ShoppingListService){
    }


    ngOnInit(){
        this.subscription = this.slService.startedEditing.subscribe(
            (index:number) =>{
                this.editMode = true;
                this.editedItemIndex = index;
                this.editedItem = this.slService.getIngredient(index);
                this.slForm.setValue({
                    name:this.editedItem.name,
                    amount:this.editedItem.amount
                });
            }
        );
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();   
    }

    onSubmit(form:NgForm){
        
        const ingName = form.value.name;
        const ingAmount = form.value.amount;
        const newIngrediant = new Ingredient(ingName,ingAmount);
        if(this.editMode){
            this.slService.updateIngredient(this.editedItemIndex, newIngrediant);
        }else{
            this.slService.addIngredient(newIngrediant);
        }
        
        this.editMode = false;
        form.reset();
    }

    onClear(){
        this.slForm.reset();
        this.editMode = false; 
    }

    onDelete(){
        this.slService.deleteIngredient(this.editedItemIndex);
        this.editMode=false;
        this.onClear();
    }
}