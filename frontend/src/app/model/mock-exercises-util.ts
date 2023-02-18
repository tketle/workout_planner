import { Exercises } from "./exercises";
import {MuscleRegion} from "./MuscleRegion";

export const MOCK_EXERCISES: Exercises = {
  aerobic_exercises: {
    id: "test_id1",
    type: "aerobic",
    exercises: [
      {
        id: "test_id2",
        name: "test_exercise",
        equipment: ["test_equipment"]
      }
    ]
  },
  anaerobic_exercises: {
    id: "test_id3",
    type: "anaerobic",
    muscle_groups: [
      {
        id: "test_id4",
        name: "test_muscle_groups",
        muscle_regions: [
          {
            id: "test_id5",
            name: "test_muscle_region",
            muscles: ["muscle1", "muscle2"],
            exercises: [
              {
                id: "test_id6",
                name: "test_exercise",
                targeted_muscles: ["foo"],
                equipment: "test_equipment",
                muscle_region: 'test_id4'
              }
            ]
          }
        ]
      }
    ]
  }
};
