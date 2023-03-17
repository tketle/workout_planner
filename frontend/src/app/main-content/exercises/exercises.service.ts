import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {API_HOST_NAME} from "../../env";
import {MockExercisesUtil} from "./model/mock-exercises-util";
import {AerobicExercise} from "./model/AerobicExercise";
import {AnaerobicExercise} from "./model/AnaerobicExercise";
import {AnaerobicData} from "./model/AnaerobicData";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  anaerobicDataCache!: AnaerobicData;
  aerobicExercisesCache!: AerobicExercise[];

  constructor(
    private httpClient: HttpClient
  ) { }

  getAerobicExercises(): Observable<AerobicExercise[]> {
    if (this.aerobicExercisesCache !== undefined) {
      return of(this.aerobicExercisesCache);
    }

    return this.httpClient.get<AerobicExercise[]>(API_HOST_NAME + "/exercises/aerobic/exercises")
      .pipe(
        catchError(this.handleError<AerobicExercise[]>('getAerobicExercises', MockExercisesUtil.MOCK_AEROBIC_EXERCISES))
      );
  }

  getAnaerobicData(): Observable<AnaerobicData> {
    if (this.anaerobicDataCache !== undefined) {
      return of(this.anaerobicDataCache);
    }

    return this.httpClient.get<AnaerobicData>(API_HOST_NAME + "/exercises/anaerobic")
      .pipe(
        catchError(this.handleError<AnaerobicData>('getAnaerobicData',
          {
            'anaerobic_exercises': MockExercisesUtil.MOCK_ANAEROBIC_EXERCISES,
            'muscle_groups': MockExercisesUtil.MOCK_MUSCLE_GROUPS,
            'muscle_regions': MockExercisesUtil.MOCK_MUSCLE_REGIONS
          }
        ))
      );
  }

  updateAnaerobicDataCache(anaerobicData: AnaerobicData): void {
    this.anaerobicDataCache = anaerobicData;
  }

  updateAerobicExercisesCache(aerobicExercises: AerobicExercise[]): void {
    this.aerobicExercisesCache = aerobicExercises;
  }

  addAnaerobicExercise(exercise: AnaerobicExercise): Observable<any> {
    return this.httpClient.post<any>(API_HOST_NAME + "/exercises/anaerobic/exercises", exercise);
  }

  updateAnaerobicExercise(exercise: AnaerobicExercise): Observable<any> {
    return this.httpClient.put<any>(API_HOST_NAME + "/exercises/anaerobic/exercises", exercise);
  }

  deleteAnaerobicExercise(exerciseId: string): Observable<any> {
    return this.httpClient.delete<any>(API_HOST_NAME + '/exercises/anaerobic/' + exerciseId);
  }

  addAerobicExercise(exercise: AerobicExercise): Observable<any> {
    return this.httpClient.post<any>(API_HOST_NAME + "/exercises/aerobic/exercises", exercise);
  }

  updateAerobicExercise(exercise: AerobicExercise): Observable<any> {
    return this.httpClient.put<any>(API_HOST_NAME + "/exercises/aerobic/exercises", exercise);
  }

  deleteAerobicExercise(exerciseId: string): Observable<any> {
    return this.httpClient.delete<AerobicExercise[]>(API_HOST_NAME + '/exercises/aerobic/' + exerciseId);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ': ' + error);
      return of(result as T);
    }
  }
}
