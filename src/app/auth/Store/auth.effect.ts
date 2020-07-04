import {Actions, ofType, Effect} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.service';
import { AuthService } from '../auth.service';
import { HeaderService } from 'src/app/header/header.service';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

const handleAuthentication = (expireIn:number, email:string, userId:string, token:string)=>{
    const expirationDate = new Date( new Date().getTime() + expireIn * 1000 );
    const user =  new User(email,userId,token,expirationDate);
    localStorage.setItem('userData',JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email:email,
        userId:userId,
        token:token,
        expirationDate:expirationDate,
        redirect:true
    });
};

const handleError = (errorRes:any) =>{
    let errorMessage = "An Unknown Error Occurred !";

    if(!errorRes.error || !errorRes.error.error){
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
            errorMessage = "Email Is Already Exist!";
            break;

            case 'INVALID_PASSWORD':
                errorMessage = "This Password Is Incorrect!";
                break;

        case 'EMAIL_NOT_FOUND':
            errorMessage = "This Email Does Not Exist!";
            break;
    }
         return of(new AuthActions.AuthenticateFail(errorMessage)); 
};

@Injectable()
export class AuthEffects{

    

    

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction:AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
            {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }
        
        ).pipe(
            tap(respData=>{
                this.authservice.setLogoutTimer(+respData.expiresIn *1000);
            }),
            map(respData=>{ 
                return handleAuthentication(+respData.expiresIn,respData.email,respData.localId,respData.idToken);  
            }),
            catchError(errorRes => {
            // return new observable, otherwise the effect will die forever
            return handleError(errorRes);
        }))
        }));


    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) =>{ 
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
            { 
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
        ).pipe(
            tap(respData=>{
                this.authservice.setLogoutTimer(+respData.expiresIn *1000);
            }),
            map(respData=>{ 
                return handleAuthentication(+respData.expiresIn,respData.email,respData.localId,respData.idToken);  
            }),
            catchError(errorRes => {
            // return new observable, otherwise the effect will die forever
            return handleError(errorRes);
        }))
        })
    );


    @Effect({dispatch:false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess)=>{
            if(authSuccessAction.payload.redirect){
                this.router.navigate(['/']);
            }
            
        })
    ); 

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            const userData:{
                email: string;
                id:string;
                _token:string;
                _tokenExpirationDate:string;
            } = JSON.parse(localStorage.getItem('userData'));
            
            if(!userData){
                console.log("Reload Failed");
                return {type:'DUMMY'};
            }

            const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
            if(loadedUser.token){
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authservice.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess({
                        email: loadedUser.email, 
                        userId:loadedUser.id, 
                        token: loadedUser.token, 
                        expirationDate: new Date(userData._tokenExpirationDate),
                        redirect:false 
                    });
                
                /* this.autoLogout(expirationDuration); */
            }

            return {type:'DUMMY'};
        }));
     
    
    @Effect({dispatch:false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            this.authservice.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
            this.headerService.linkButton.next("Authenticate");
        })
    );
    
    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router,
                private authservice: AuthService,
                private headerService: HeaderService){}
}
//ofType is an filter
 //ofType = continue in this observable chain if the action that reacting to here is of type LOGIN_START, all other will not trigger this effect here