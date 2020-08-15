import { Component, Input } from "@angular/core";
import { Recipe } from '../../recipe.model';
import { trigger, transition, animate, keyframes, style,group } from '@angular/animations';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.scss'],
    animations:[

      trigger('ShowUp', [

        transition('void => *', [
          animate(250,keyframes([
            style({
              opacity:0
            }),
            style({
              opacity:0.2

            }),
            style({
              opacity:0.5
            }),
            style({
              opacity:0.8
            }),
            style({
              opacity:1,
            })
          ]))
        ]),

        transition('* => *', [
          animate(750,keyframes([
            style({
              opacity:1
            }),
            style({
              opacity:0.8

            }),
            style({
              opacity:0.5
            }),
            style({
              opacity:0.2
            }),
            style({
              opacity:0,
            })
          ]))
        ])
      ])

    ]
})

export class RecipeItemComponent{
    @Input() recipe: Recipe;
    @Input() index: number;


}
