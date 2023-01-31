from abc import ABC


class Exercise(ABC):
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        """The name of the Exercise"""
        return self._name

    @name.setter
    def name(self, name):
        self._name = name

    @name.deleter
    def name(self):
        del self._name


class AerobicExercise(Exercise):
    def __init__(self, name):
        super().__init__(name)

    def __str__(self):
        return f"<{self._name}>"

    def __repr__(self):
        return self.__str__()


class AnaerobicExercise(Exercise):
    def __init__(self, name, muscle_group, muscle_region, muscles, equipment):
        super().__init__(name)
        self._muscle_group = muscle_group
        self._muscle_region = muscle_region
        self._muscles = muscles
        self._equipment = equipment

    @property
    def muscle_group(self):
        """The MuscleGroup that the AnaerobicExercise targets"""
        return self._muscle_group

    @muscle_group.setter
    def muscle_group(self, muscle_group):
        self._muscle_group = muscle_group

    @muscle_group.deleter
    def muscle_group(self):
        del self._muscle_group

    @property
    def muscle_region(self):
        """The MuscleRegion that the AnaerobicExercise targets"""
        return self._muscle_region

    @muscle_region.setter
    def muscle_region(self, muscle_region):
        self._muscle_region = muscle_region

    @muscle_region.deleter
    def muscle_region(self):
        del self._muscle_region

    @property
    def muscles(self):
        """A list of the Muscles that the AnaerobicExercise targets"""
        return self._muscles

    @muscles.setter
    def muscles(self, muscles):
        self._muscles = muscles

    @muscles.deleter
    def muscles(self):
        del self._muscles

    @property
    def equipment(self):
        """The name of the equipment needed to perform the AnaerobicExercise, if applicable"""
        return self._equipment

    @equipment.setter
    def equipment(self, equipment):
        self._equipment = equipment

    @equipment.deleter
    def equipment(self):
        del self.equipment

    def has_muscle(self, muscle_name):
        for muscle in self._muscles:
            if muscle.name == muscle_name:
                return True

        return False

    def __str__(self):
        return f"<{self._name}: {self._muscle_group.name}: {self._muscle_region.name}: {self._muscles}: {self._equipment}>"

    def __repr__(self):
        return self.__str__()


class Circuit(object):
    def __init__(self, exercises=None):
        if exercises is None:
            self._exercises = []
        else:
            self._exercises = exercises

    @property
    def exercises(self):
        """A dict of Exercises that constitute the Circuit"""
        return self._exercises

    @exercises.setter
    def exercises(self, exercises):
        self._exercises = exercises

    @exercises.deleter
    def exercises(self):
        del self._exercises

    def add_exercise(self, exercise):
        self._exercises.append(exercise)

    def has_exercise(self, exercise_name):
        return self._exercises.has_key(exercise_name)

    def __str__(self):
        return "<" + ",".join(self._exercises.keys()) + ">"

    def __repr__(self):
        return self.__str__()
