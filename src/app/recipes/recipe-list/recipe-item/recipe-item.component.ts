import { Component, Input } from "@angular/core";
import { Recipe } from '../../recipe.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.scss']
})

export class RecipeItemComponent{
    @Input() recipe: Recipe;
    @Input() index: number;


}
