import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from '../shared/dropdown.directive';


import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DropzoneDirective } from './recipe-edit/dragdrop/dropzone.directive';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from '../../environments/environment';
import { UploaderComponent } from './recipe-edit/dragdrop/uploader/uploader.component';
import { UploadTaskComponent } from './recipe-edit/dragdrop/upload-task/upload-task.component';
import { FileSizePipe } from './recipe-edit/dragdrop/upload-task/file-size.pipe';



@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        DropdownDirective,
        DropzoneDirective,
        UploaderComponent,
        UploadTaskComponent,
        FileSizePipe
    ],
    imports:[RouterModule,
             ReactiveFormsModule,
             RecipesRoutingModule,
             SharedModule,
             AngularFireModule.initializeApp(environment.firebase),
             AngularFirestoreModule,
             AngularFireStorageModule
            ]

    /* exports:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        DropdownDirective,
    ], */
})
export class RecipesModule{

}
