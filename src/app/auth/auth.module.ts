import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core.module';

@NgModule({
    declarations:[AuthComponent],
    imports:[RouterModule,FormsModule,AuthRoutingModule, SharedModule,CoreModule],
})
export class AuthModule{

}

