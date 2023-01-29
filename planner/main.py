from model.muscle import MuscleRegion, MuscleGroup
from model.exercise import AerobicExercise, AnaerobicExercise, Circuit
from model.workout import WorkoutType, Workout
from random import sample
from json import load


_muscle_groups = {}
_muscle_regions = {}
_exercises = {}
_workouts = []


def parse_exercises(exercises, muscle_groups, muscle_regions):
    with open('planner/static/exercises.json') as f:
        data = load(f)

        aerobic_exercises = {}
        anaerobic_exercises = {}

        for aerobic_exercise in data["exercises"][0]["exercises"]:
            aerobic_exercises[aerobic_exercise["name"]] = AerobicExercise(aerobic_exercise["name"])

        for muscle_group in data["exercises"][1]["muscle_groups"]:
            muscle_groups[muscle_group["name"]] = MuscleGroup(muscle_group["name"])

            for muscle_region in muscle_group["muscle_regions"]:
                muscle_regions[muscle_region["name"]] = MuscleRegion(muscle_region["name"], muscle_region["muscles"])
                muscle_groups[muscle_group["name"]].add_muscle_region(muscle_regions[muscle_region["name"]])

                for exercise in muscle_region["exercises"]:
                    anaerobic_exercises[exercise["name"]] = \
                        AnaerobicExercise(
                            exercise["name"],
                            muscle_groups[muscle_group["name"]],
                            muscle_regions[muscle_region["name"]],
                            exercise["targeted_muscles"], exercise["equipment"])

        exercises["aerobic"] = aerobic_exercises
        exercises["anaerobic"] = anaerobic_exercises


def get_exercises_targeting_muscle_group(muscle_group, exercises):
    return list(filter(lambda exercise: exercise.muscle_group.name == muscle_group, exercises))


def get_exercises_targeting_muscle_region(muscle_region, exercises):
    return list(filter(lambda exercise: exercise.muscle_region.name == muscle_region, exercises))


def add_workout(workout_type):
    workout = Workout(workout_type)

    exercises_targeting_muscle_group = \
        get_exercises_targeting_muscle_group(workout_type.name, _exercises["anaerobic"].values())

    for muscle_region in _muscle_groups[workout_type.name].muscle_regions:
        exercises_targeting_muscle_region = \
            get_exercises_targeting_muscle_region(muscle_region.name, exercises_targeting_muscle_group)

        workout.add_circuit(muscle_region.name, Circuit({exercise.name: exercise
                                                         for exercise in sample(exercises_targeting_muscle_region, 2)}))

    _workouts.append(workout)


def print_workouts():
    for workout in _workouts:
        print(workout)
        print()


def main():
    parse_exercises(_exercises, _muscle_groups, _muscle_regions)

    add_workout(WorkoutType.Push)
    add_workout(WorkoutType.Pull)
    add_workout(WorkoutType.Core)
    add_workout(WorkoutType.Legs)

    print_workouts()


if __name__ == '__main__':
    main()
