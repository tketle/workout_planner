DROP TABLE IF EXISTS muscle_region;
DROP TABLE IF EXISTS aerobic_exercise;
DROP TABLE IF EXISTS anaerobic_exercise;
DROP TABLE IF EXISTS workout;

CREATE TABLE muscle_region (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    muscle_group TEXT NOT NULL,
    muscles TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE aerobic_exercise (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    equipment TEXT,
    version INTEGER NOT NULL DEFAULT 1,
    active BIT DEFAULT 1,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, version)
);

CREATE TABLE anaerobic_exercise (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    muscle_region TEXT NOT NULL,
    targeted_muscles TEXT NOT NULL,
    equipment TEXT,
    version INTEGER NOT NULL DEFAULT 1,
    active BIT DEFAULT 1,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (muscle_region) REFERENCES muscle_region (id),
    UNIQUE(name, version)
);

CREATE TABLE workout (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    aerobic_exercise TEXT,
    anaerobic_exercise TEXT,
    duration INTEGER,
    weight INTEGER,
    repetitions INTEGER,
    sets INTEGER,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aerobic_exercise) REFERENCES aerobic_exercise (id),
    FOREIGN KEY (anaerobic_exercise) REFERENCES anaerobic_exercise (id)
);



