import { Component, OnInit } from "@angular/core";
import { RecipeService } from './recipe.service';
import { HeaderService } from '../header/header.service';
import {trigger, state, style, transition, animate, group, keyframes} from '@angular/animations';


@Component({
    selector:'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    animations:[
      trigger('recipes', [
        state('normal', style({
          opacity:1,
          transform: 'translateX(0)'
        })),

        transition('void => *', [
          animate(150,keyframes([
            style({
              transform: 'translateX(-50px)',
              opacity:0,
              offset:0
            }),
            style({
              transform: 'translateX(-35px)',
              opacity:0.5,
              offset:0.3
            }),
            style({
              transform: 'translateX(-10px)',
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
            animate(150,
              style({
                color: 'gray',
              })),
            animate(200,
            style({
              transform: 'translateX(100px)',
              opacity:0
            }))
          ])

        ])
      ])

    ]
})

export class RecipesComponent implements OnInit{

    constructor(private headerService: HeaderService){ }

    ngOnInit(){
        this.headerService.linkButton.next('Recipe');
    }

}
