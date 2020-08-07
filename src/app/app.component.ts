import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthAction from './auth/Store/auth.actions';
import { Store } from '@ngrx/store';
import {isPlatformBrowser} from '@angular/common';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  title = 'PROJECT';

  constructor(private authService:AuthService,
              private store : Store<fromApp.AppState>,
              @Inject(PLATFORM_ID)private platformId,
              private loggingService: LoggingService){}


  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AuthAction.AutoLogin());
    }
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
    
    /* this.authService.autoLogin(); */
  }
  

}
