DROP TABLE relations;
DROP TABLE things;

CREATE TABLE things (
	id serial PRIMARY KEY,
	name text NOT NULL UNIQUE,
	summary text NOT NULL
);

CREATE TABLE relations (
	from_thing_id int REFERENCES things ON DELETE CASCADE,
	to_thing_id int REFERENCES things ON DELETE CASCADE,
	description TEXT,
	PRIMARY KEY (from_thing_id, to_thing_id)
);