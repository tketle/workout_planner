import {Component, OnInit} from '@angular/core';
import { Exercises } from "../model/exercises";
import { ExercisesService } from "../exercises.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  title = 'Exercises';
  exercises!: Exercises;

  constructor(
    private exercisesService: ExercisesService,
    private messageService: MessageService
  ) {}

  getExercises(): void {
    this.exercisesService.getExercises()
      .subscribe(exercises => {
        console.log(exercises);
        this.exercises = exercises
      });
  }

  ngOnInit(): void {
    this.getExercises();
  }
}
