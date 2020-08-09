import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import {AlertComponenet} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import { RecipeService } from '../recipes/recipe.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls:['./auth.component.scss']
})
export class AuthComponent implements OnInit{

    isLoginMode = true;
    isLoading = false;
    error:string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost : PlaceholderDirective;
    closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private recipeService: RecipeService,
                private headerService: HeaderService, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit(){
        this.recipeService.deleteAllRecipes();
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

        let authObs: Observable<AuthResponseData>;

        if(this.isLoginMode){
            authObs = this.authService.login(email,password);
        }else{
            authObs = this.authService.signup(email,password);
        }

        authObs.subscribe(
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
            });
        /* console.log(authForm.value); */
        /* authForm.reset(); */
    }

    onHandleError(){
        this.error=null;
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



}
