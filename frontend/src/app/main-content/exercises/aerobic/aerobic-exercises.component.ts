import { Component, OnInit } from '@angular/core';
import {AerobicExercise} from "../model/AerobicExercise";
import {ExercisesService} from "../exercises.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAerobicDialogComponent} from "./delete-aerobic-dialog/delete-aerobic-dialog.component";
import {v4 as uuidv4} from "uuid";


const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'string',
    source: undefined,
    label: 'Name',
    style: 'width: 46.5%;',
  },
  {
    key: 'equipment',
    type: 'string',
    source: undefined,
    label: 'Equipment',
    style: 'width: 46.5%;',
  },
  {
    key: 'edit_or_done',
    type: 'edit_or_done',
    source: undefined,
    label: '',
    style: 'width: 3.5%;',
  },
  {
    key: 'delete_or_cancel',
    type: 'delete_or_cancel',
    source: undefined,
    label: '',
    style: 'width: 3.5%;',
  },
];


enum State {
  VIEWING,
  EDITING,
  CREATING,
  DELETING
}

@Component({
  selector: 'app-aerobic-exercises',
  templateUrl: './aerobic-exercises.component.html',
  styleUrls: ['../../../../styles/exercises.component.scss']
})
export class AerobicExercisesComponent implements OnInit {
  state: State = State.VIEWING;

  aerobic_exercises!: AerobicExercise[];

  columnSchema = COLUMNS_SCHEMA;
  displayedColumns: string[] = this.columnSchema.map((col) => col.key);

  editExerciseId!: string;
  exerciseRestoreValue!: AerobicExercise;

  constructor(
    private exercisesService: ExercisesService,
    public dialog: MatDialog
  ) {}

  openDialog(exerciseId: string, exerciseName: string): void {
    if (this.state != State.VIEWING) {
      console.debug(State[this.state]);
      return;
    }

    this.state = State.DELETING;

    const dialogRef = this.dialog.open(DeleteAerobicDialogComponent, {
      data: {id: exerciseId, name: exerciseName},
      position: {top: '15%'}
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response !== undefined) {
        this.removeExercise(exerciseId);
      }

      this.state = State.VIEWING;
    });
  }

  ngOnInit(): void {
    this.getAerobicExercises();
  }

  getAerobicExercises(): void {
    this.exercisesService.getAerobicExercises()
      .subscribe((exercises: AerobicExercise[]) => {
        this.aerobic_exercises = exercises;
      })
  }

  isEditingOrCreating(exerciseId: string): boolean {
    return [State.EDITING, State.CREATING].includes(this.state)
      && exerciseId == this.editExerciseId;
  }

  addRow(): void {
    if (this.state != State.VIEWING) {
      console.debug(State[this.state]);
      return;
    }

    this.state = State.CREATING;

    const newRow: AerobicExercise = {
      id: uuidv4(),
      name: '',
      equipment: ''
    };

    this.aerobic_exercises = [...this.aerobic_exercises, newRow];
    this.editExerciseId = newRow.id;
  }

  startEdit(exerciseId: string): void {
    if (this.state != State.VIEWING) {
      console.debug(State[this.state]);
      return;
    }

    this.state = State.EDITING;
    this.editExerciseId = exerciseId;
    this.exerciseRestoreValue = structuredClone(this.aerobic_exercises.find(
      (exercise) => exercise.id == exerciseId));
  }

  saveChanges(exercise: AerobicExercise): void {
    if (this.state == State.EDITING) {
      this.updateExercise(exercise);
    }
    else {
      this.addExercise(exercise);
    }

    this.exerciseRestoreValue = <AerobicExercise>{};
    this.editExerciseId = '';
    this.state = State.VIEWING;
  }

  cancelEdit(exerciseId: string): void {
    if (this.state == State.CREATING) {
      this.removeExercise(exerciseId);
    }
    else {
      this.aerobic_exercises.forEach((exercise, i) => {
        if (exercise.id == exerciseId) {
          this.aerobic_exercises[i] = structuredClone(this.exerciseRestoreValue);
          this.aerobic_exercises = [...this.aerobic_exercises]; // Re-render table
          return;
        }
      });
    }

    this.state = State.VIEWING;
  }

  updateExercise(updatedExercise: AerobicExercise): void {
    this.exercisesService.updateAerobicExercise(updatedExercise).subscribe();
  }

  addExercise(exercise: AerobicExercise): void {
    this.exercisesService.addAerobicExercise(exercise).subscribe();
  }

  removeExercise(exerciseId: string): void {
    this.aerobic_exercises = this.aerobic_exercises.filter(
      (exercise) => exercise.id !== exerciseId);
  }
}
