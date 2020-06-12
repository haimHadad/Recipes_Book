import { Component, OnInit, OnDestroy } from "@angular/core";
import {Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header/header.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit, OnDestroy{
    
    ingredients:Ingredient[];
    private subscription : Subscription;

    constructor(private slService: ShoppingListService, private headerService: HeaderService){

    }

    ngOnInit() {
      this.headerService.linkButton.next('ShoppingList');
      this.ingredients =  this.slService.getIngredients(); 
      console.log(this.ingredients);
      this.subscription = this.slService.ingrediantChanged
        .subscribe(
          (ingrediants: Ingredient[])=>{
            this.ingredients=ingrediants;
          }
      );
    }
   
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    onEditItem(index:number){
      this.slService.startedEditing.next(index);
    }

}