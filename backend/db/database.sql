CREATE TABLE  kanal(
    id  SERIAL PRIMARY KEY,
    date Date,
    name VARCHAR(255),
    numberOf INT,
    distance FLOAT
);
create TABLE  person(
    id  SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255)
)