import { Injectable } from '@angular/core';
import { Exercises } from "./model/exercises";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageService } from "./message.service";
import {catchError, map, Observable, of, tap} from "rxjs";
import {API_URL} from "./env";
import {MOCK_EXERCISES} from "./model/mock-exercises";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private exercisesUrl = API_URL + "/exercises";

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  getExercises(): Observable<Exercises> {
    return this.httpClient.get<Exercises>(this.exercisesUrl)
      .pipe(
        map(this.parseExercisesResponse),
        tap(_ => this.log("fetched exercises")),
        catchError(this.handleError<Exercises>('getExercises', MOCK_EXERCISES))
      );
  }

  private parseExercisesResponse(response: any) {
    return {
      aerobic_exercises: response.exercises[0],
      anaerobic_exercises: response.exercises[1]
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log('${operation} failed: ${error.message}');
      return of(result as T);
    }
  }
}
