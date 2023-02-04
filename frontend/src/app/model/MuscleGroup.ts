import {MuscleRegion} from "./MuscleRegion";

export interface MuscleGroup {
  id: string;
  name: string;
  muscle_regions: MuscleRegion[];
}
