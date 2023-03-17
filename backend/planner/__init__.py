import os

from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        DATABASE=os.path.join(app.instance_path, 'planner.sqlite')
    )
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite+pysqlite:///planner.sqlite'

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    from . import exercises
    app.register_blueprint(exercises.bp)

    return app
