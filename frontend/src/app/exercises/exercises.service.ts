import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MessageService } from "../messages/message.service";
import {catchError, map, Observable, of, tap} from "rxjs";
import {API_HOST_NAME} from "../env";
import {MockExercisesUtil} from "./model/mock-exercises-util";
import {AerobicExercise} from "./model/AerobicExercise";
import {AnaerobicExercise} from "./model/AnaerobicExercise";
import {MuscleGroup} from "./model/MuscleGroup";
import {MuscleRegion} from "./model/MuscleRegion";
import {AnaerobicData} from "./model/AnaerobicData";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  getAerobicExercises(): Observable<AerobicExercise[]> {
    return this.httpClient.get<AerobicExercise[]>(API_HOST_NAME + "/exercises/aerobic/exercises")
      .pipe(
        tap(_ => this.log("fetched aerobic exercises")),
        catchError(this.handleError<AerobicExercise[]>('getAerobicExercises', MockExercisesUtil.MOCK_AEROBIC_EXERCISES))
      );
  }

  getAnaerobicData(): Observable<AnaerobicData> {
    return this.httpClient.get<AnaerobicData>(API_HOST_NAME + "/exercises/anaerobic")
      .pipe(
        tap(_ => this.log("fetched anaerobic data")),
        catchError(this.handleError<AnaerobicData>('getAnaerobicData',
          {
            'anaerobic_exercises': MockExercisesUtil.MOCK_ANAEROBIC_EXERCISES,
            'muscle_groups': MockExercisesUtil.MOCK_MUSCLE_GROUPS,
            'muscle_regions': MockExercisesUtil.MOCK_MUSCLE_REGIONS
          }
        ))
      );
  }

  addAnaerobicExercise(exercise: AnaerobicExercise): Observable<any> {
    return this.httpClient.post<any>(API_HOST_NAME + "/exercises/anaerobic/exercises", exercise)
      .pipe(tap(_ => this.log("added anaerobic exercise")));
  }

  updateAnaerobicExercise(exercise: AnaerobicExercise): Observable<any> {
    return this.httpClient.put<any>(API_HOST_NAME + "/exercises/anaerobic/exercises", exercise)
      .pipe(tap(_ => this.log("updated anaerobic exercise")));
  }

  deleteAnaerobicExercise(exerciseId: string): Observable<any> {
    return this.httpClient.delete<any>(API_HOST_NAME + '/exercises/anaerobic/' + exerciseId)
      .pipe(tap(_ => this.log("deleted anaerobic exercise")));
  }

  addAerobicExercise(exercise: AerobicExercise): Observable<any> {
    return this.httpClient.post<any>(API_HOST_NAME + "/exercises/aerobic/exercises", exercise)
      .pipe(tap(_ => this.log("added aerobic exercise")));
  }

  updateAerobicExercise(exercise: AerobicExercise): Observable<any> {
    return this.httpClient.put<any>(API_HOST_NAME + "/exercises/aerobic/exercises", exercise)
      .pipe(tap(_ => this.log("updated aerobic exercise")));
  }

  deleteAerobicExercise(exerciseId: string): Observable<any> {
    return this.httpClient.delete<AerobicExercise[]>(API_HOST_NAME + '/exercises/aerobic/' + exerciseId)
      .pipe(tap(_ => this.log("deleted aerobic exercise")));
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
