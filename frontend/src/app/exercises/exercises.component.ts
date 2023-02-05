import {Component, OnInit, ViewChild} from '@angular/core';
import { Exercises } from "../model/exercises";
import { ExercisesService } from "./exercises.service";
import { MessageService } from "../messages/message.service";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {DeleteExerciseResponse} from "../model/DeleteExerciseResponse";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercises!: Exercises;
  displayedAnaerobicColumns: string[] = ['exerciseName', 'exerciseMuscles', 'exerciseEquipment', 'edit', 'delete'];

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  constructor(
    private exercisesService: ExercisesService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  openDialog(exerciseId: string, exerciseName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: exerciseId, name: exerciseName}
    });

    dialogRef.afterClosed().subscribe(deleteResponse => {
      this.updateExercisesAfterDelete(deleteResponse);
    })
  }

  getExercises(): void {
    if (this.exercises === undefined) {
      this.exercisesService.getExercises()
        .subscribe(exercises => {
          this.exercises = exercises
        });
    }
  }

  updateExercisesAfterDelete(deleteResponse: DeleteExerciseResponse): void {
    this.exercises.anaerobic_exercises
      .muscle_groups[deleteResponse.group_idx]
      .muscle_regions[deleteResponse.region_idx]
      .exercises = deleteResponse.exercises;
  }

  ngOnInit(): void {
    this.getExercises();
  }
}
