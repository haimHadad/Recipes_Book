import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
/* import { AuthService, AuthResponseData } from './auth.service'; */
import { /* Observable, */ Subscription } from 'rxjs';
/* import { Router } from '@angular/router'; */
import { HeaderService } from '../header/header.service';
import {AlertComponenet} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import { RecipeService } from '../recipes/recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './Store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls:['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{

    isLoginMode = true;
    isLoading = false;
    error:string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost : PlaceholderDirective; 
    private closeSub: Subscription;
    private storeSub: Subscription;

    constructor(/* private authService: AuthService, */ 
                /* private router: Router,  */
                private recipeService: RecipeService,
                /* private headerService: HeaderService, */
                private componentFactoryResolver: ComponentFactoryResolver,
                private store: Store<fromApp.AppState>) {}

    ngOnInit(){
        this.recipeService.deleteAllRecipes();

        this.storeSub = this.store.select('auth').subscribe(authState =>{
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if(this.error){
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
        this.error="";
    }

    onSubmit(authForm :NgForm){

        if(!authForm.value){
            return;
        }

        this.error="";
        this.isLoading=true;
        const email = authForm.value.email;
        const password = authForm.value.password;

        /* let authObs: Observable<AuthResponseData>; */

        if(this.isLoginMode){
            /* authObs = this.authService.login(email,password); */
            this.store.dispatch(new AuthActions.LoginStart({email:email,password: password}));
        }else{
            /* authObs = this.authService.signup(email,password); */ 
            this.store.dispatch(new AuthActions.SignupStart({email:email,password: password}));
        }

        

        /* authObs.subscribe(
            resData =>{
                console.log(resData);
                this.isLoading=false;
                this.router.navigate(['/recipes']);
                this.headerService.linkButton.next('Recipe');
            },
            errorMessage=>{
                console.log(errorMessage);
                this.isLoading=false;
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
            }); */
        /* console.log(authForm.value); */
        authForm.reset();
    }

    onHandleError(){
        /* this.error=null; */
        this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(message: string){
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponenet);
        const hostViewContainerRef =  this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(()=>{
            hostViewContainerRef.clear();
            this.closeSub.unsubscribe();
        });
    }

    
    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }

        if(this.storeSub){
            this.storeSub.unsubscribe();
        }
        
    }
}