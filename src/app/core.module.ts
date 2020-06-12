import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HeaderService } from './header/header.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers:[ShoppingListService, RecipeService, HeaderService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}]
})
export class CoreModule{

}