import {AerobicExercise} from "./AerobicExercise";

export interface AerobicExerciseList {
  id: string;
  type: string;
  exercises: AerobicExercise[];
}
