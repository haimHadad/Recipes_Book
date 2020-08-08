import { Component, OnInit } from "@angular/core";
import { RecipeService } from './recipe.service';
import { HeaderService } from '../header/header.service';

@Component({
    selector:'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit{

    constructor(private headerService: HeaderService){ }

    ngOnInit(){
        this.headerService.linkButton.next('Recipe');
    }

}
