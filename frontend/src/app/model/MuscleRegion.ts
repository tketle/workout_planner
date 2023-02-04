import {AnaerobicExercise} from "./AnaerobicExercise";

export interface MuscleRegion {
  id: string;
  name: string;
  muscles: string[];
  exercises: AnaerobicExercise[];
}
