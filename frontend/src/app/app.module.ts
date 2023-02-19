import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnaerobicExercisesComponent } from './exercises/anaerobic/anaerobic-exercises.component';
import { MessagesComponent } from './messages/messages.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteAnaerobicDialogComponent } from './exercises/anaerobic/delete-anaerobic-dialog/delete-anaerobic-dialog.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { ExercisesComponent } from './exercises/exercises.component';
import { AerobicExercisesComponent } from './exercises/aerobic-exercises/aerobic-exercises.component';
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { DeleteAerobicDialogComponent } from './exercises/aerobic-exercises/delete-aerobic-dialog/delete-aerobic-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AnaerobicExercisesComponent,
    MessagesComponent,
    DeleteAnaerobicDialogComponent,
    ExercisesComponent,
    AerobicExercisesComponent,
    DeleteAerobicDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatTabsModule,
    RouterLink,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
