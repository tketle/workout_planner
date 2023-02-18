import {Component, OnInit, ViewChild} from '@angular/core';
import { Exercises } from "../../model/impl/ExercisesImpl";
import { ExercisesService } from "../exercises.service";
import { MessageService } from "../../messages/message.service";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {DeleteExerciseResponse} from "../../model/DeleteExerciseResponse";
import {AnaerobicExercise} from "../../model/AnaerobicExercise";
import {v4 as uuidv4} from 'uuid';
import {MuscleRegion} from "../../model/MuscleRegion";

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'string',
    source: undefined,
    label: 'Name',
    style: 'width: 31%;',
  },
  {
    key: 'targeted_muscles',
    type: 'array',
    source: [''],
    label: 'Targeted Muscles',
    style: 'width: 31%;',
  },
  {
    key: 'equipment',
    type: 'string',
    source: undefined,
    label: 'Equipment',
    style: 'width: 31%;',
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
  selector: 'app-exercises',
  templateUrl: './anaerobic-exercises.component.html',
  styleUrls: ['../../../styles/exercises.component.scss']
})
export class AnaerobicExercisesComponent implements OnInit {
  state: State = State.VIEWING;
  exercises!: Exercises;
  columnSchema = COLUMNS_SCHEMA;
  displayedAnaerobicColumns: string[] = this.columnSchema.map((col) => col.key);

  editExerciseId!: string;
  exerciseRestoreValue!: AnaerobicExercise;

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  constructor(
    private exercisesService: ExercisesService,
    //private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getExercises();
  }

  openDialog(exerciseId: string, exerciseName: string): void {
    if (this.state != State.VIEWING) {
      // TODO: show error message
      return;
    }

    this.state = State.DELETING;

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: exerciseId, name: exerciseName},
      position: {top: '15%'}
    });

    dialogRef.afterClosed().subscribe(deleteResponse => {
      if (deleteResponse !== undefined) {
        this.updateExercisesAfterDelete(deleteResponse);
      }

      this.state = State.VIEWING;
    });
  }

  isEditingOrCreating(exerciseId: string): boolean {
    return [State.EDITING, State.CREATING].includes(this.state)
      && exerciseId == this.editExerciseId;
  }

  addRow(muscleRegion: MuscleRegion): void {
    if (this.state != State.VIEWING) {
      // TODO: show error message
      return;
    }

    this.state = State.CREATING;

    const newRow: AnaerobicExercise = {
      id: uuidv4(),
      name: '',
      targeted_muscles: [],
      equipment: '',
      muscle_region: muscleRegion.id
    };

    muscleRegion.addExercise(newRow);
    this.editExerciseId = newRow.id;
  }

  startEdit(muscleRegion: MuscleRegion, exerciseIdx: number): void {
    if (this.state != State.VIEWING) {
      // TODO: show error message
      return;
    }

    this.state = State.EDITING;
    this.editExerciseId = muscleRegion.exercises[exerciseIdx].id;
    this.exerciseRestoreValue = structuredClone(muscleRegion.exercises[exerciseIdx]);
  }

  saveChanges(): void {
    this.exerciseRestoreValue = <AnaerobicExercise>{};
    this.editExerciseId = '';
    this.state = State.VIEWING;
  }

  cancelEdit(muscleGroupId: string, muscleRegionId: string, exercise: AnaerobicExercise): void {
    if (this.state == State.CREATING) {
      this.removeExercise(muscleGroupId, muscleRegionId, exercise);
    }
    else {
      this.restoreExerciseValue(muscleGroupId, muscleRegionId, exercise);
    }

    this.state = State.VIEWING;
  }

  getExercises(): void {
    if (this.exercises === undefined) {
      this.exercisesService.getExercises()
        .subscribe(exercises => {
          this.exercises = exercises
          this.populateMuscles();
        });
    }
  }

  removeExercise(muscleGroupId: string, muscleRegionId: string, exercise: AnaerobicExercise): void {
    this.exercises.anaerobic_exercises
        .findMuscleGroupById(muscleGroupId)
        .findMuscleRegionById(muscleRegionId)
        .removeExercise(exercise);
  }

  restoreExerciseValue(muscleGroupId: string, muscleRegionId: string, exercise: AnaerobicExercise): void {
    let foo: AnaerobicExercise = this.exercises.anaerobic_exercises
        .findMuscleGroupById(muscleGroupId)
        .findMuscleRegionById(muscleRegionId)
        .findExerciseById(exercise.id);

    foo.name = this.exerciseRestoreValue.name;
    foo.targeted_muscles = this.exerciseRestoreValue.targeted_muscles;
    foo.equipment = this.exerciseRestoreValue.equipment;
  }

  updateExercisesAfterDelete(deleteResponse: DeleteExerciseResponse): void {
    this.exercises.anaerobic_exercises
      .muscle_groups[deleteResponse.group_idx]
      .muscle_regions[deleteResponse.region_idx]
      .exercises = deleteResponse.exercises;
  }

  populateMuscles(): void {
    const muscles : string[] = [];

    this.exercises.anaerobic_exercises.muscle_groups.forEach((muscleGroup) => {
      muscleGroup.muscle_regions.forEach((muscleRegion) => {
        muscles.push(...muscleRegion.muscles);
      });
    });

    this.columnSchema[1].source = muscles;
  }
}
