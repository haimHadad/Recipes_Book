import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    providers:[AuthComponent],
    imports:[FormsModule],
})
export class AuthModule{

}