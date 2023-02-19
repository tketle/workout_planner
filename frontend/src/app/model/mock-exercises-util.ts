import {MuscleRegion} from "./MuscleRegion";
import {AerobicExercise} from "./AerobicExercise";
import {MuscleGroup} from "./MuscleGroup";
import {AnaerobicExercise} from "./AnaerobicExercise";

export class MockExercisesUtil {
  static MOCK_AEROBIC_EXERCISES: AerobicExercise[] = [
    {
      id: "ae_1",
      name: "Mock Aerobic Exercise 1",
      equipment: "Mock equipment"
    },
    {
      id: "ae_2",
      name: "Mock Aerobic Exercise 2",
      equipment: "Mock equipment"
    },
  ];

  static MOCK_ANAEROBIC_EXERCISES: AnaerobicExercise[] = [
    {
      id: "ane_1",
      name: "Mock Anaerobic Exercise 1",
      targeted_muscles: ["mock muscle 1"],
      equipment: "Mock equipment",
      muscle_region: "mr_1"
    },
    {
      id: "ane_2",
      name: "Mock Anaerobic Exercise 2",
      targeted_muscles: ["mock muscle 2"],
      equipment: "Mock equipment",
      muscle_region: "mr_2"
    },
    {
      id: "ane_3",
      name: "Mock Anaerobic Exercise 3",
      targeted_muscles: ["mock muscle 3"],
      equipment: "Mock equipment",
      muscle_region: "mr_3"
    },
    {
      id: "ane_4",
      name: "Mock Anaerobic Exercise 4",
      targeted_muscles: ["mock muscle 4"],
      equipment: "Mock equipment",
      muscle_region: "mr_4"
    },
  ];

  static MOCK_MUSCLE_GROUPS: MuscleGroup[] = [
    {
      id: "mg_1",
      name: "Mock Muscle Group 1",
    },
    {
      id: "mg_2",
      name: "Mock Muscle Group 2",
    },
  ];

  static MOCK_MUSCLE_REGIONS: MuscleRegion[] = [
    {
      id: "mr_1",
      name: "Mock Muscle Region 1",
      muscles: ["mock muscle 1"],
      muscle_group: "mg_1"
    },
    {
      id: "mr_2",
      name: "Mock Muscle Region 2",
      muscles: ["mock muscle 2"],
      muscle_group: "mg_1"
    },
    {
      id: "mr_3",
      name: "Mock Muscle Region 3",
      muscles: ["mock muscle 3"],
      muscle_group: "mg_2"
    },
    {
      id: "mr_4",
      name: "Mock Muscle Region 4",
      muscles: ["mock muscle 4"],
      muscle_group: "mg_2"
    },
  ];
}
