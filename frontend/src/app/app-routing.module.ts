import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ExercisesComponent} from "./exercises/exercises.component";

const routes: Routes = [
  {path: 'exercises', component: ExercisesComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
