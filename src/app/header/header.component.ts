import { Component, ViewChild, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HeaderService } from './header.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls:['./header.component.scss']
})
export class headerComponent implements OnInit,OnDestroy{
    collapsed = true;
    linkPressed = "Authenticate";
    subscriptionDropDown: Subscription;
    subscriptionLinkButton: Subscription;
    subscriptionUser: Subscription;
    dropdownClicked=false;
    isAuthenticated = false;

    constructor(private headerservice: HeaderService,private dataStorageService:DataStorageService, private authService: AuthService, private router: Router){

    }

    ngOnInit(): void {
      /* if(!this.isAuthenticated){
        this.router.navigate(['/auth']);
      } */

      this.subscriptionDropDown = this.headerservice.isDropdownOpen.subscribe(
        (state: boolean) =>{
          this.dropdownClicked = state;
      }
      );

      this.subscriptionLinkButton = this.headerservice.linkButton.subscribe(
        (linkName:string)=>{
          this.linkPressed = linkName;
        });

        this.subscriptionUser = this.authService.user.subscribe(user=>{

          this.isAuthenticated = !!user;
          console.log(!user);
          console.log(!!user);
        })


    }
    ngOnDestroy(): void {
      this.subscriptionDropDown.unsubscribe();
      this.subscriptionLinkButton.unsubscribe();
      this.subscriptionUser.unsubscribe();
    }

    onSaveData(){
      this.dataStorageService.storeRecipes();
    }

    onFetchData(){
      this.headerservice.isLoadingRecipes.next(true);
      this.dataStorageService.fetchRecipes().subscribe(
        () => {this.headerservice.isLoadingRecipes.next(false);}
      );
    }

    onLogout(){
      this.authService.logout();
    }
}


          /* if(state == true){
            this.manageButton.nativeElement.classList.add('customBackground');
          }else{
            this.manageButton.nativeElement.classList.remove('customBackground');
          } */

          //    @ViewChild('manageButton', {static: false}) manageButton: any;
