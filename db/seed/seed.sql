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
	loc_latitude DECIMAL,
	loc_longitude DECIMAL,
	profile_pic TEXT DEFAULT 'https://firebasestorage.googleapis.com/v0/b/group-jam-session.appspot.com/o/images%2Fprofile-placeholder.png?alt=media&token=c0e37b8a-5aad-469d-95d3-9adfd04378fc', -- default avatar
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
	user_id INTEGER REFERENCES users(user_id) NOT NULL,
	match_id INTEGER REFERENCES users NOT NULL,
	is_matched BOOLEAN DEFAULT FALSE NOT NULL,
	is_rejected BOOLEAN DEFAULT FALSE NOT NULL,
	is_blocked BOOLEAN DEFAULT FALSE NOT NULL,
	PRIMARY KEY(user_id, match_id)
);

CREATE TABLE distance (
	distance_id SERIAL PRIMARY KEY,
	distance_mi DECIMAL,
	distance_text TEXT
);