from flask import (
    Blueprint, request, jsonify
)
from http import HTTPStatus

from sqlalchemy import select, update, delete
from sqlalchemy.exc import IntegrityError, DBAPIError

from planner.schema.models import (
    AerobicExercise, AnaerobicExercise, MuscleRegion, DataClassUnpack, Workout
)
from planner.db import db

bp = Blueprint('exercises', __name__, url_prefix=None)


@bp.get('/workouts')
def workouts():
    return db.session.scalars(select(Workout)).all()


@bp.get('/workouts/<workout_id>')
def workout(workout_id):
    return db.session.scalars(select(Workout).where(Workout.id == workout_id)).first() \
           or f'Workout with ID {workout_id} not found', HTTPStatus.BAD_REQUEST


@bp.get('/muscleregions')
def muscle_regions():
    return db.session.scalars(select(MuscleRegion)).all()


@bp.get('/muscleregions/<muscle_region_id>')
def muscle_region(muscle_region_id):
    return db.session.scalars(select(MuscleRegion).where(MuscleRegion.id == muscle_region_id)).first() \
           or f'Muscle Region with ID {muscle_region_id} not found', HTTPStatus.BAD_REQUEST


@bp.get('/exercises/anaerobic')
def anaerobic_exercises():
    return db.session.scalars(select(AnaerobicExercise)).all()


@bp.get('/exercises/anaerobic/<exercise_id>')
def anaerobic_exercise_by_id(exercise_id):
    ret = db.session.scalars(select(AnaerobicExercise).where(AnaerobicExercise.id == exercise_id)).first()
    return jsonify(ret) if ret is not None \
        else f'Anaerobic Exercise with ID {exercise_id} not found', HTTPStatus.BAD_REQUEST


@bp.get('/exercises/anaerobic/name/<exercise_name>')
def anaerobic_exercise_by_name(exercise_name):
    return db.session.scalars(select(AnaerobicExercise).where(AnaerobicExercise.name == exercise_name)).all() \
        or (f'No Anaerobic Exercises found with name {exercise_name}', HTTPStatus.BAD_REQUEST)


@bp.get("/exercises/anaerobic/data")
def anaerobic_data():
    return {'muscle_regions': muscle_regions(),
            'anaerobic_exercises': anaerobic_exercises()}


@bp.post('/exercises/anaerobic')
def add_anaerobic_version():
    try:
        db.session.add(DataClassUnpack.instantiate(AnaerobicExercise, request.json))
        db.session.commit()
        return '', HTTPStatus.NO_CONTENT
    except DBAPIError as e:
        return str(e.orig), HTTPStatus.BAD_REQUEST if isinstance(e, IntegrityError) \
            else HTTPStatus.INTERNAL_SERVER_ERROR


@bp.put('/exercises/anaerobic/active')
def set_active_anaerobic_version():
    try:
        current_active = db.session.scalar(select(AnaerobicExercise.id)
                                           .where(AnaerobicExercise.name == request.args.get('name'))
                                           .where(AnaerobicExercise.active))

        if current_active is not None:
            db.session.execute(update(AnaerobicExercise)
                               .where(AnaerobicExercise.id == current_active)
                               .values(active=False))

        db.session.execute(update(AnaerobicExercise)
                           .where(AnaerobicExercise.name == request.args.get('name'))
                           .where(AnaerobicExercise.version == int(request.args.get('version')))
                           .values(active=True))

        db.session.commit()

        return '', HTTPStatus.NO_CONTENT
    except DBAPIError as e:
        return str(e.orig), HTTPStatus.BAD_REQUEST if isinstance(e, IntegrityError) \
            else HTTPStatus.INTERNAL_SERVER_ERROR


@bp.delete('/exercises/anaerobic/<exercise_name>')
def delete_anaerobic_exercise(exercise_name):
    try:
        exercises = db.session.scalars(select(AnaerobicExercise).where(AnaerobicExercise.name == exercise_name))

        used_versions = []
        for exercise in exercises:
            if bool(db.session.query(Workout.anaerobic_exercise).filter_by(anaerobic_exercise=exercise.id).first()):
                used_versions.append(exercise.version)

        if used_versions:
            return f'Exercise \'{exercise_name}\' versions {sorted(used_versions)} have been used in at least one ' \
                   f'Workout and cannot be deleted. If you want it removed from the exercise pool, ' \
                   f'mark all of its versions as Inactive.', \
                HTTPStatus.BAD_REQUEST

        db.session.execute(delete(AerobicExercise).where(AnaerobicExercise.name == exercise_name))
        db.session.commit()

        return '', HTTPStatus.NO_CONTENT
    except DBAPIError as e:
        return str(e.orig), HTTPStatus.BAD_REQUEST if isinstance(e, IntegrityError) \
            else HTTPStatus.INTERNAL_SERVER_ERROR


@bp.get('/exercises/aerobic')
def aerobic_exercises():
    return db.session.scalars(select(AerobicExercise)).all()


@bp.get('/exercises/aerobic/<exercise_id>')
def aerobic_exercise_by_id(exercise_id):
    ret = db.session.scalars(select(AerobicExercise).where(AerobicExercise.id == exercise_id)).first()
    return jsonify(ret) if ret is not None \
        else f'Aerobic Exercise with ID {exercise_id} not found', HTTPStatus.BAD_REQUEST


@bp.get('/exercises/aerobic/name/<exercise_name>')
def aerobic_exercise_by_name(exercise_name):
    return db.session.scalars(select(AerobicExercise).where(AerobicExercise.name == exercise_name)).all() \
        or (f'No Aerobic Exercises found with name {exercise_name}', HTTPStatus.BAD_REQUEST)


@bp.post('/exercises/aerobic')
def add_aerobic_version():
    try:
        db.session.add(DataClassUnpack.instantiate(AerobicExercise, request.json))
        db.session.commit()
        return '', HTTPStatus.NO_CONTENT
    except DBAPIError as e:
        return str(e.orig), HTTPStatus.BAD_REQUEST if isinstance(e, IntegrityError) \
            else HTTPStatus.INTERNAL_SERVER_ERROR


@bp.put('/exercises/aerobic/active')
def set_active_aerobic_version():
    try:
        current_active = db.session.scalar(select(AerobicExercise.id)
                                           .where(AerobicExercise.name == request.args.get('name'))
                                           .where(AerobicExercise.active))

        if current_active is not None:
            db.session.execute(update(AerobicExercise)
                               .where(AerobicExercise.id == current_active)
                               .values(active=False))

        db.session.execute(update(AerobicExercise)
                           .where(AerobicExercise.name == request.args.get('name'))
                           .where(AerobicExercise.version == int(request.args.get('version')))
                           .values(active=True))

        db.session.commit()

        return '', HTTPStatus.NO_CONTENT
    except DBAPIError as e:
        return str(e.orig), HTTPStatus.BAD_REQUEST if isinstance(e, IntegrityError) \
            else HTTPStatus.INTERNAL_SERVER_ERROR


@bp.put('/exercises/aerobic/inactive')
def set_inactive_aerobic_version():
    try:
        db.session.execute(update(AerobicExercise)
                           .where(AerobicExercise.name == request.args.get('name'))
                           .where(AerobicExercise.version == int(request.args.get('version')))
                           .values(active=False))

        db.session.commit()

        return '', HTTPStatus.NO_CONTENT
    except DBAPIError as e:
        return str(e.orig), HTTPStatus.BAD_REQUEST if isinstance(e, IntegrityError) \
            else HTTPStatus.INTERNAL_SERVER_ERROR


@bp.delete('/exercises/aerobic/<exercise_name>')
def delete_aerobic_exercise(exercise_name):
    try:
        exercises = db.session.scalars(select(AerobicExercise).where(AerobicExercise.name == exercise_name))

        used_versions = []
        for exercise in exercises:
            if bool(db.session.query(Workout.aerobic_exercise).filter_by(aerobic_exercise=exercise.id).first()):
                used_versions.append(exercise.version)

        if used_versions:
            return f'Exercise \'{exercise_name}\' versions {sorted(used_versions)} have been used in at least one ' \
                   f'Workout and cannot be deleted. If you want it removed from the exercise pool, ' \
                   f'mark all of its versions as Inactive.', \
                HTTPStatus.BAD_REQUEST

        db.session.execute(delete(AerobicExercise).where(AerobicExercise.name == exercise_name))
        db.session.commit()

        return '', HTTPStatus.NO_CONTENT
    except DBAPIError as e:
        return str(e.orig), HTTPStatus.BAD_REQUEST if isinstance(e, IntegrityError) \
            else HTTPStatus.INTERNAL_SERVER_ERROR
