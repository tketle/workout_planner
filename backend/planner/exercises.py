import os
from flask import (
    Blueprint, json, current_app as app
)


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


@bp.post('/exercises/anaerobic/<exercise_id>')
def update_anaerobic_exercise(exercise_id):
    raise NotImplementedError('Not implemented')


@bp.delete('/exercises/anaerobic/<exercise_id>')
def delete_anaerobic_exercise(exercise_id):
    _exercise_schema['anaerobic_exercises'][:] = \
        [exercise for exercise in _exercise_schema['anaerobic_exercises']
            if not exercise['id'] == exercise_id]

    #update_schema('anaerobic_exercises')

    return _exercise_schema['anaerobic_exercises']


def update_schema(schema):
    filename = os.path.join(app.static_folder, 'schema/' + schema + '.json')
    with open(filename, 'w') as f:
        json.dump(_exercise_schema[schema], f, sort_keys=False, indent=4)
