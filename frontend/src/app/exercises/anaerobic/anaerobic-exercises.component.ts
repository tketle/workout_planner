import {Component, OnInit, ViewChild} from '@angular/core';
import { ExercisesService } from "../exercises.service";
import { MessageService } from "../../messages/message.service";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAnaerobicDialogComponent} from "./delete-anaerobic-dialog/delete-anaerobic-dialog.component";
import {AnaerobicExercise} from "../../model/AnaerobicExercise";
import {v4 as uuidv4} from 'uuid';
import {MuscleRegion} from "../../model/MuscleRegion";
import {MuscleGroup} from "../../model/MuscleGroup";

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
    type: 'map',
    source: {},
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
  selector: 'app-anaerobic-exercises',
  templateUrl: './anaerobic-exercises.component.html',
  styleUrls: ['../../../styles/anaerobic-exercises.component.scss']
})
export class AnaerobicExercisesComponent implements OnInit {
  state: State = State.VIEWING;

  anaerobic_exercises!: AnaerobicExercise[];
  muscle_groups!: MuscleGroup[];
  muscle_regions!: MuscleRegion[];

  columnSchema = COLUMNS_SCHEMA;
  displayedColumns: string[] = this.columnSchema.map((col) => col.key);

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
    this.getAnaerobicData();
  }

  openDialog(exerciseId: string, exerciseName: string): void {
    if (this.state != State.VIEWING) {
      console.debug(State[this.state]);
      return;
    }

    this.state = State.DELETING;

    const dialogRef = this.dialog.open(DeleteAnaerobicDialogComponent, {
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

  isEditingOrCreating(exerciseId: string): boolean {
    return [State.EDITING, State.CREATING].includes(this.state)
      && exerciseId == this.editExerciseId;
  }

  addRow(muscleRegion: any): void {
    if (this.state != State.VIEWING) {
      console.debug(State[this.state]);
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

    this.anaerobic_exercises.push(newRow);
    this.editExerciseId = newRow.id;
  }

  startEdit(exerciseId: string): void {
    if (this.state != State.VIEWING) {
      console.debug(State[this.state]);
      return;
    }

    this.state = State.EDITING;
    this.editExerciseId = exerciseId;
    this.exerciseRestoreValue = structuredClone(this.anaerobic_exercises.find(
      (exercise) => exercise.id == exerciseId));
  }

  saveChanges(exercise: AnaerobicExercise): void {
    if (this.state == State.EDITING) {
      this.updateExercise(exercise);
    }
    else {
      this.addExercise(exercise);
    }

    this.exerciseRestoreValue = <AnaerobicExercise>{};
    this.editExerciseId = '';
    this.state = State.VIEWING;
  }

  cancelEdit(exerciseId: string): void {
    if (this.state == State.CREATING) {
      this.removeExercise(exerciseId);
    }
    else {
      this.anaerobic_exercises.forEach((exercise, i) => {
        if (exercise.id == exerciseId) {
          this.anaerobic_exercises[i] = structuredClone(this.exerciseRestoreValue);
          return;
        }
      });
    }

    this.state = State.VIEWING;
  }

  getAnaerobicData(): void {
    this.exercisesService.getAnaerobicData()
      .subscribe(anaerobicData => {
        this.anaerobic_exercises = anaerobicData.anaerobic_exercises;
        this.muscle_groups = anaerobicData.muscle_groups;
        this.muscle_regions = anaerobicData.muscle_regions;
        this.populateMuscles();
      });
  }

  getMuscleRegionsInGroup(groupId: string): MuscleRegion[] {
    return this.muscle_regions.filter((muscleRegion) => muscleRegion.muscle_group == groupId);
  }

  getAnaerobicExercisesInRegion(regionId: string): AnaerobicExercise[] {
    return this.anaerobic_exercises.filter((anaerobicExercise) => anaerobicExercise.muscle_region == regionId);
  }

  updateExercise(updatedExercise: AnaerobicExercise): void {
    this.exercisesService.updateAnaerobicExercise(updatedExercise).subscribe();
  }

  addExercise(exercise: AnaerobicExercise): void {
    this.exercisesService.addAnaerobicExercise(exercise).subscribe();
  }

  removeExercise(exerciseId: string): void {
    this.anaerobic_exercises = this.anaerobic_exercises.filter(
      (exercise) => exercise.id !== exerciseId);
  }

  populateMuscles(): void {
    const muscles : any = {};

    this.muscle_regions.forEach((muscleRegion) => {
      muscles[muscleRegion.name] = muscleRegion.muscles;
    });

    this.columnSchema[1].source = muscles;
  }
}
