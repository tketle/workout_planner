import {Component, Inject} from '@angular/core';
import {ExercisesService} from "../../exercises.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface Data {
  id: string,
  name: string
}

@Component({
  selector: 'app-delete-aerobic-dialog',
  templateUrl: './delete-aerobic-dialog.component.html',
  styleUrls: ['../../../../styles/delete-aerobic-dialog.component.css']
})
export class DeleteAerobicDialogComponent {

  constructor(
    private exercisesService: ExercisesService,
    public dialogRef: MatDialogRef<DeleteAerobicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.exercisesService.deleteAerobicExercise(this.data.id)
      .subscribe(response => {
        this.dialogRef.close(response);
      })
  }
}
