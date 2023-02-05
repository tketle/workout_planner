import {AnaerobicExercise} from "./AnaerobicExercise";

export interface DeleteExerciseResponse {
  group_idx: number,
  region_idx: number,
  exercises: AnaerobicExercise[]
}
