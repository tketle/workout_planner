import {AnaerobicExercise} from "./AnaerobicExercise";
import {MuscleGroup} from "./MuscleGroup";
import {MuscleRegion} from "./MuscleRegion";

export interface AnaerobicData {
  anaerobic_exercises: AnaerobicExercise[];
  muscle_groups: MuscleGroup[];
  muscle_regions: MuscleRegion[];
}
