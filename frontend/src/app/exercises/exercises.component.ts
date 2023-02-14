import {Component, OnInit, ViewChild} from '@angular/core';
import { Exercises } from "../model/exercises";
import { ExercisesService } from "./exercises.service";
import { MessageService } from "../messages/message.service";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {DeleteExerciseResponse} from "../model/DeleteExerciseResponse";
import {AnaerobicExercise} from "../model/AnaerobicExercise";
import {v4 as uuidv4} from 'uuid';

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

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['../../styles/exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  exercises!: Exercises;
  displayedAnaerobicColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnSchema = COLUMNS_SCHEMA;

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  constructor(
    private exercisesService: ExercisesService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  openDialog(exerciseId: string, exerciseName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: exerciseId, name: exerciseName},
      position: {top: '15%'}
    });

    dialogRef.afterClosed().subscribe(deleteResponse => {
      this.updateExercisesAfterDelete(deleteResponse);
    });
  }

  addRow(mg_idx: number, mr_idx: number): void {
    const newRow: AnaerobicExercise = {id: uuidv4(), name: '', targeted_muscles: [], equipment: '', editing: true, isNew: true};
    let exercises = this.exercises.anaerobic_exercises.muscle_groups[mg_idx].muscle_regions[mr_idx].exercises;
    exercises = [...exercises, newRow];
    this.exercises.anaerobic_exercises.muscle_groups[mg_idx].muscle_regions[mr_idx].exercises = exercises;
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

  ngOnInit(): void {
    this.getExercises();
  }
}
