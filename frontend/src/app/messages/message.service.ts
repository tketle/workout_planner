import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  hPos: MatSnackBarHorizontalPosition = 'start';
  vPos: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.hPos,
      verticalPosition: this.vPos,
      duration: 3000
    })
  }
}
