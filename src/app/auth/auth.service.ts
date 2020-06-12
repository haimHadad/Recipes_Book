import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {throwError, Subject, BehaviorSubject} from 'rxjs';
import { User } from './user.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}


@Injectable({providedIn:'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null);
    token:string = null;
    private tokenExpirationTimer:any;

    constructor(private http: HttpClient, private router: Router, private headerService: HeaderService){}

    
    signup(newEmail:string, newPassword:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATh3vrWBprIJMfIUEtfnlzTivQ60nU1Q0',
            {
                email: newEmail,
                password: newPassword,
                returnSecureToken: true
            }
        
        ).pipe(catchError(this.handleError), 
          tap(resData =>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
        }));
    }

  
    login(newEmail:string, newPassword:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATh3vrWBprIJMfIUEtfnlzTivQ60nU1Q0',
            {
                email: newEmail,
                password: newPassword,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), 
        tap(resData =>{
            console.log("The response login req:"+resData);
            this.handleAuthentication(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
      }));
    }

    autoLogin(){
        
        const userData:{
            email: string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
        } = JSON.parse(localStorage.getItem('userData'));
        
        if(!userData){
            console.log("Reload Failed");
            return;
        }
        
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            
        }
        
    }

    logout(){
        localStorage.setItem('userData',null);
        this.user.next(null);
        this.router.navigate(['/auth']);
        this.headerService.linkButton.next("Authenticate");
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuartion: number){
        this.tokenExpirationTimer =setTimeout(()=>{
            this.logout();
        },expirationDuartion)
    }



    private handleAuthentication(email:string, userId, token: string, expiresIn: number){

        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
        const user = new User(email,userId,token,expirationDate); 
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }


    private handleError (errorRes: HttpErrorResponse){
        let errorMessage = "An Unknown Error Occurred !";

        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
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
        return throwError(errorMessage);

    }
}