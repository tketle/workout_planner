import click
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
import sqlite3

db = SQLAlchemy()


def init_db():
    temp_db = sqlite3.connect(current_app.config['DATABASE'])
    temp_db.row_factory = sqlite3.Row

    with current_app.open_resource('schema/planner.sql') as f:
        temp_db.executescript(f.read().decode('utf8'))

    with current_app.open_resource('schema/test_data.sql') as f:
        temp_db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    db.init_app(app)
    app.cli.add_command(init_db_command)
