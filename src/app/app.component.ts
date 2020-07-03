import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthAction from './auth/Store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  title = 'PROJECT';

  constructor(private authService:AuthService,
              private store : Store<fromApp.AppState>){}


  ngOnInit() {
    this.store.dispatch(new AuthAction.AutoLogin());
    /* this.authService.autoLogin(); */
  }
  

}
