import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {headerComponent} from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import {StoreModule} from '@ngrx/store'
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import { AuthEffects } from './auth/Store/auth.effect';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import { RecipeEffect } from './recipes/store/recipes.effects';

@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects,RecipeEffect]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

