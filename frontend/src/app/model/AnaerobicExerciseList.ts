import {MuscleGroup} from "./MuscleGroup";

export interface AnaerobicExerciseList {
  id: string;
  type: string;
  muscle_groups: MuscleGroup[];
}
