CREATE TABLE movements (
	id INTEGER not null PRIMARY KEY AUTOINCREMENT,
	description VARCHAR(30) NOT NULL,
	amount DECIMAL (5,2) NOT NULL,
	date TEXT
)
