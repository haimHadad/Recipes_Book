import { Component, OnInit, OnDestroy } from "@angular/core";
import {Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header/header.service';
import {trigger, state, style, transition, animate, group, keyframes} from '@angular/animations';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
    animations: [
      trigger('ShowIngrediant', [
        state('normal', style({
          opacity:1,
          transform: 'translateX(0)'
        })),

        transition('void => *', [
          animate(250,keyframes([
            style({
              transform: 'translateX(100px)',
              opacity:0,
              offset:0
            }),
            style({
              transform: 'translateX(75px)',
              opacity:0.2,
              offset:0.1
            }),
            style({
              transform: 'translateX(50px)',
              opacity:0.5,
              offset:0.4
            }),
            style({
              transform: 'translateX(25px)',
              opacity:1,
              offset:0.8
            }),
            style({
              transform: 'translateX(0px)',
              opacity:1,
              offset:1
            })
          ]))
        ]),

        transition('* => void', [
          group([
            animate(200,
              style({
                color: 'red',
              })),
            animate(400,
            style({
              transform: 'translateX(50px)',
              opacity:0
            }))
          ])

        ])
      ])
    ]
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
