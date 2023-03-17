from dataclasses import dataclass, fields
from datetime import datetime, date
from typing import Optional

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column
from typing_extensions import Annotated

from planner.db import db

strpk = Annotated[str, mapped_column(primary_key=True)]
timestamp = Annotated[
    datetime, mapped_column(nullable=False, server_default=func.CURRENT_TIMESTAMP())
]


class DataClassUnpack:
    class_field_cache = {}

    @classmethod
    def instantiate(cls, class_to_instantiate, arg_dict):
        if class_to_instantiate not in cls.class_field_cache:
            cls.class_field_cache[class_to_instantiate] = {f.name for f in fields(class_to_instantiate) if f.init}

        field_set = cls.class_field_cache[class_to_instantiate]
        filtered_arg_dict = {k: v for k, v in arg_dict.items() if k in field_set}
        return class_to_instantiate(**filtered_arg_dict)


@dataclass
class MuscleRegion(db.Model):
    id: Mapped[strpk]
    name: Mapped[str]
    muscle_group: Mapped[str]
    muscles: Mapped[str]
    created: Mapped[timestamp]
    updated: Mapped[timestamp]

    def __repr__(self) -> str:
        return f"MuscleRegion(" \
               f"id={self.id!r}, " \
               f"name={self.name!r}, " \
               f"muscle_group={self.muscle_group!r}, " \
               f"muscles={self.muscles!r}, " \
               f"created={self.created!r}, " \
               f"updated={self.updated!r})"


@dataclass
class AerobicExercise(db.Model):
    id: Mapped[strpk]
    name: Mapped[str]
    equipment: Mapped[Optional[str]]
    version: Mapped[int]
    active: Mapped[bool]
    created: Mapped[timestamp]
    updated: Mapped[timestamp]

    def __repr__(self) -> str:
        return f"AerobicExercise(" \
               f"id={self.id!r}, " \
               f"name={self.name!r}, " \
               f"equipment={self.equipment!r}, " \
               f"version={self.version!r}, " \
               f"active={self.active!r}, " \
               f"created={self.created!r}, " \
               f"updated={self.updated!r})"


@dataclass
class AnaerobicExercise(db.Model):
    id: Mapped[strpk]
    name: Mapped[str]
    muscle_region: Mapped[str]
    targeted_muscles: Mapped[str]
    equipment: Mapped[Optional[str]]
    version: Mapped[int]
    active: Mapped[bool]
    created: Mapped[timestamp]
    updated: Mapped[timestamp]

    muscle_region = mapped_column(ForeignKey("muscle_region.id"))

    def __repr__(self) -> str:
        return f"AnaerobicExercise(" \
               f"id={self.id!r}, " \
               f"name={self.name!r}, " \
               f"muscle_region={self.muscle_region!r}, " \
               f"targeted_muscles={self.targeted_muscles!r}, " \
               f"equipment={self.equipment!r}, " \
               f"version={self.version!r}, " \
               f"active={self.active!r}, " \
               f"created={self.created!r}, " \
               f"updated={self.updated!r})"


@dataclass
class Workout(db.Model):
    id: Mapped[strpk]
    date: Mapped[date]
    aerobic_exercise: Mapped[Optional[str]]
    anaerobic_exercise: Mapped[Optional[str]]
    duration: Mapped[Optional[int]]
    weight: Mapped[Optional[int]]
    repetitions: Mapped[Optional[int]]
    sets: Mapped[Optional[int]]
    created: Mapped[timestamp]
    updated: Mapped[timestamp]

    aerobic_exercise = mapped_column(ForeignKey("aerobic_exercise.id"))
    anaerobic_exercise = mapped_column(ForeignKey("anaerobic_exercise.id"))

    def __repr__(self) -> str:
        return f"Workout(" \
               f"id={self.id!r}, " \
               f"date={self.date!r}, " \
               f"aerobic_exercise={self.aerobic_exercise!r}, " \
               f"anaerobic_exercise={self.anaerobic_exercise!r}, " \
               f"duration={self.duration!r}, " \
               f"weight={self.weight!r}, " \
               f"repetitions={self.repetitions!r}, " \
               f"sets={self.sets!r}, " \
               f"created={self.created!r}, " \
               f"updated={self.updated!r})"
