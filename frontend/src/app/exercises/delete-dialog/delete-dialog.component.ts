import {Component, Inject} from '@angular/core';
import { ExercisesService } from "../exercises.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface Data {
  id: string,
  name: string
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['../../../styles/delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    private exercisesService: ExercisesService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.exercisesService.deleteAnaerobicExercise(this.data.id)
      .subscribe(response => {
        this.dialogRef.close(response);
      });
  }
}
