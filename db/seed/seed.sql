CREATE TABLE instrument (
	instrument_id SERIAL PRIMARY KEY,
	instrument_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE levels (
	level_id SERIAL PRIMARY KEY,
	level_name TEXT UNIQUE NOT NULL
);

CREATE TABLE experience (
	experience_id SERIAL PRIMARY KEY,
	experience_years VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(200) NOT NULL,
	location VARCHAR(200),
	profile_pic TEXT,
	bio VARCHAR(500)
);

CREATE TABLE message (
	message_id SERIAL PRIMARY KEY,
	message_body VARCHAR(255) NOT NULL,
	message_sender INTEGER REFERENCES users(user_id),
	message_recipient INTEGER REFERENCES users(user_id)
);

CREATE TABLE profile (
	user_id INTEGER REFERENCES users(user_id),
	instrument_id INTEGER REFERENCES instrument(instrument_id),
	level_id INTEGER REFERENCES levels(level_id),
	experience_id INTEGER REFERENCES experience(experience_id),
	PRIMARY KEY(user_id, instrument_id)
);

CREATE TABLE matches (
	user_id INTEGER REFERENCES users(user_id),
	match_id INTEGER REFERENCES users(user_id),
	is_matched BOOLEAN DEFAULT FALSE,
	is_blocked BOOLEAN DEFAULT FALSE,
	PRIMARY KEY(user_id, match_id)
);