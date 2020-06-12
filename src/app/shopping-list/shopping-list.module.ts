import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list--routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    exports:[
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports:[RouterModule, FormsModule, ShoppingListRoutingModule,SharedModule],
})
export class ShoppingListModule{

}