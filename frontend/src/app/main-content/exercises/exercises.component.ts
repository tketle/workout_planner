import {Component, Injectable} from '@angular/core';
import {ContentComponent} from "../content-component";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['../../../styles/exercises.component.scss']
})
export class ExercisesComponent implements ContentComponent {
  name: string = 'Exercises';
}
