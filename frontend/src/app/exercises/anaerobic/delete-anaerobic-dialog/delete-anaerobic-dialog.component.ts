import {Component, Inject} from '@angular/core';
import { ExercisesService } from "../../exercises.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface Data {
  id: string,
  name: string
}

@Component({
  selector: 'app-delete-anaerobic-dialog',
  templateUrl: './delete-anaerobic-dialog.component.html',
  styleUrls: ['../../../../styles/delete-anaerobic-dialog.component.css']
})
export class DeleteAnaerobicDialogComponent {

  constructor(
    private exercisesService: ExercisesService,
    public dialogRef: MatDialogRef<DeleteAnaerobicDialogComponent>,
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
