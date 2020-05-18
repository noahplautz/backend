DROP TABLE IF EXISTS rounds;

CREATE TABLE rounds (
	id SERIAL PRIMARY KEY,
	year INT,
	month INT,
	day INT,
	course TEXT,
	weather TEXT,
	holes INT,
	score INT,
	is_deleted INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
