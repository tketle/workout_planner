from flask import (
    Blueprint, json, request
)
from http import HTTPStatus


bp = Blueprint('exercises', __name__, url_prefix=None)

_exercise_schema = {
    'muscle_groups': None, 'muscle_regions': None,
    'aerobic_exercises': None, 'anaerobic_exercises': None
}


def init():
    global _exercise_schema
    for key in _exercise_schema:
        with open('planner/schema/' + key + '.json') as file:
            _exercise_schema[key] = json.load(file)


@bp.get('/exercises/aerobic/exercises')
def aerobic_exercises():
    return _exercise_schema['aerobic_exercises']


@bp.get("/exercises/anaerobic")
def anaerobic_data():
    return {'anaerobic_exercises': _exercise_schema['anaerobic_exercises'],
            'muscle_groups': _exercise_schema['muscle_groups'],
            'muscle_regions': _exercise_schema['muscle_regions']}


@bp.get('/exercises/anaerobic/exercises')
def anaerobic_exercises():
    return _exercise_schema['anaerobic_exercises']


@bp.get('/exercises/anaerobic/musclegroups')
def muscle_groups():
    return _exercise_schema['muscle_groups']


@bp.get('/exercises/anaerobic/muscleregions')
def muscle_regions():
    return _exercise_schema['muscle_regions']


@bp.post('/exercises/anaerobic/exercises')
def add_anaerobic_exercise():
    exercise = request.json
    first_matching = \
        next((i for i, e in enumerate(_exercise_schema['anaerobic_exercises'])
              if e['muscle_region'] == exercise['muscle_region']), -1)

    if first_matching == -1:
        return 'Could not find muscle region with matching ID: ' + exercise['muscle_region'], \
            HTTPStatus.INTERNAL_SERVER_ERROR

    insert_pos = \
        next((i + first_matching for i, e in enumerate(_exercise_schema['anaerobic_exercises'][first_matching:])
              if e['muscle_region'] != exercise['muscle_region']), len(_exercise_schema['anaerobic_exercises']))

    _exercise_schema['anaerobic_exercises'].insert(insert_pos, exercise)
    update_schema('anaerobic_exercises')

    return '', HTTPStatus.NO_CONTENT


@bp.put('/exercises/anaerobic/exercises')
def update_anaerobic_exercise():
    updated_exercise = request.json
    for i, exercise in enumerate(_exercise_schema['anaerobic_exercises']):
        if exercise['id'] == updated_exercise['id']:
            _exercise_schema['anaerobic_exercises'][i] = updated_exercise

    update_schema('anaerobic_exercises')

    return '', HTTPStatus.NO_CONTENT


@bp.delete('/exercises/anaerobic/<exercise_id>')
def delete_anaerobic_exercise(exercise_id):
    _exercise_schema['anaerobic_exercises'][:] = \
        [exercise for exercise in _exercise_schema['anaerobic_exercises']
            if not exercise['id'] == exercise_id]

    update_schema('anaerobic_exercises')

    return '', HTTPStatus.NO_CONTENT


@bp.post('/exercises/aerobic/exercises')
def add_aerobic_exercise():
    _exercise_schema['aerobic_exercises'].append(request.json)
    update_schema('anaerobic_exercises')

    return '', HTTPStatus.NO_CONTENT


@bp.put('/exercises/aerobic/exercises')
def update_aerobic_exercise():
    updated_exercise = request.json
    for i, exercise in enumerate(_exercise_schema['aerobic_exercises']):
        if exercise['id'] == updated_exercise['id']:
            _exercise_schema['aerobic_exercises'][i] = updated_exercise

    update_schema('aerobic_exercises')

    return '', HTTPStatus.NO_CONTENT


@bp.delete('/exercises/aerobic/<exercise_id>')
def delete_aerobic_exercise(exercise_id):
    _exercise_schema['aerobic_exercises'][:] = \
        [exercise for exercise in _exercise_schema['aerobic_exercises']
            if not exercise['id'] == exercise_id]

    update_schema('aerobic_exercises')

    return '', HTTPStatus.NO_CONTENT


def update_schema(schema):
    with open('planner/schema/' + schema + '.json', 'w') as f:
        json.dump(_exercise_schema[schema], f, sort_keys=False, indent=4)
