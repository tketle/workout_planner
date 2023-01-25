from enum import Enum

WorkoutType = Enum("WorkoutType", "Push Pull Core Legs")


class Workout(object):
    def __init__(self, workout_type, circuits=None):
        self._workout_type = workout_type
        if circuits is None:
            self._circuits = {}
        else:
            self._circuits = circuits

    @property
    def workout_type(self):
        """The type of the Workout (e.g. Push/Pull/Core/Legs)"""
        return self._workout_type

    @workout_type.setter
    def workout_type(self, workout_type):
        self._workout_type = workout_type

    @workout_type.deleter
    def workout_type(self):
        del self._workout_type

    @property
    def circuits(self):
        """The Circuits that constitute the Workout"""
        return self._circuits

    @circuits.setter
    def circuits(self, circuits):
        self._circuits = circuits

    @circuits.deleter
    def circuits(self):
        del self._circuits

    def add_circuit(self, muscle_region, circuit):
        self._circuits[muscle_region] = circuit

    def __str__(self):
        ret = "<"
        ret += self._workout_type.name + ": "
        ret += ", ".join("{} Circuit: {}".format(muscle_region, circuit)
                         for muscle_region, circuit in self._circuits.items())
        ret += ">"

        return ret

    def __repr__(self):
        return self.__str__()
