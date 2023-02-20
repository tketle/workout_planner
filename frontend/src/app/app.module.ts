import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnaerobicExercisesComponent } from './main-content/exercises/anaerobic/anaerobic-exercises.component';
import { MessagesComponent } from './messages/messages.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteAnaerobicDialogComponent } from './main-content/exercises/anaerobic/delete-anaerobic-dialog/delete-anaerobic-dialog.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { ExercisesComponent } from './main-content/exercises/exercises.component';
import { AerobicExercisesComponent } from './main-content/exercises/aerobic/aerobic-exercises.component';
import {MatTabsModule} from "@angular/material/tabs";
import { DeleteAerobicDialogComponent } from './main-content/exercises/aerobic/delete-aerobic-dialog/delete-aerobic-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MainContentComponent } from './main-content/main-content.component';
import {MatListModule} from "@angular/material/list";
import { ScheduleComponent } from './main-content/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    AnaerobicExercisesComponent,
    MessagesComponent,
    DeleteAnaerobicDialogComponent,
    ExercisesComponent,
    AerobicExercisesComponent,
    DeleteAerobicDialogComponent,
    NavbarComponent,
    SidenavComponent,
    MainContentComponent,
    ScheduleComponent
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
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatListModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
