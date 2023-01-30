import os
from flask import (
    Blueprint, render_template, json, current_app as app
)

from re import sub


bp = Blueprint('exercises', __name__, url_prefix=None)
_exercises = None


@bp.get('/exercises')
def exercises():
    global _exercises
    if _exercises is None:
        filename = os.path.join(app.static_folder, 'exercises.json')
        with open(filename) as file:
            _exercises = json.load(file)

    return render_template('exercises/exercises.html', exercises=_exercises)


@bp.get('/exercises/anaerobic/exercises')
def get_anaerobic_exercises():
    return _exercises['exercises'][1]


@bp.post('/exercises/anaerobic/<exercise_id>')
def update_anaerobic_exercise(exercise_id):
    raise NotImplementedError('Not implemented')


@bp.delete('/exercises/anaerobic/<exercise_id>')
def delete_anaerobic_exercise(exercise_id):
    muscle_group, muscle_region, exercise = find_anaerobic_exercise(exercise_id)
    muscle_region[1]['exercises'].remove(exercise)

    update_exercises_file()

    return {
        'group_idx': muscle_group[0],
        'region_idx': muscle_region[0],
        'exercises': muscle_region[1]['exercises']
    }


@bp.context_processor
def utility_processor():
    def replace_whitespace_and_special_characters(text):
        return sub('[^a-z\\d]', '_', text)
    return dict(treat_text=replace_whitespace_and_special_characters)


def update_exercises_file():
    filename = os.path.join(app.static_folder, 'exercises.json')
    with open(filename, 'w') as f:
        json.dump(_exercises, f, sort_keys=False, indent=4)


def find_anaerobic_exercise(exercise_id):
    for i, muscle_group in enumerate(_exercises['exercises'][1]['muscle_groups']):
        for j, muscle_region in enumerate(muscle_group['muscle_regions']):
            for k, exercise in enumerate(muscle_region['exercises']):
                if exercise['id'] == exercise_id:
                    return (i, muscle_group), (j, muscle_region), exercise
