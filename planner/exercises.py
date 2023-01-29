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
        print(filename)
        with open(filename) as file:
            _exercises = json.load(file)

    return render_template('exercises/exercises.html', exercises=_exercises)


@bp.context_processor
def utility_processor():
    def replace_whitespace_and_special_characters(text):
        return sub('[^a-z\\d]', '_', text)
    return dict(treat_text=replace_whitespace_and_special_characters)
