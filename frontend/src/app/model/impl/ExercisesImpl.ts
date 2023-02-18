import {AerobicExerciseList} from "./AerobicExerciseList";
import {AnaerobicExerciseList} from "./AnaerobicExerciseList";

export class Exercises {
  constructor(public aerobic_exercises: AerobicExerciseList,
              public anaerobic_exercises: AnaerobicExerciseList) {}
}
