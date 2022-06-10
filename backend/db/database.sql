/* this text you must copy and push at psql and rename yourNameTable to your name*/
    CREATE TABLE  yourNameTable(
        id  SERIAL PRIMARY KEY,
        date Date,
        name VARCHAR(255),
        numberOf INT,
        distance FLOAT
    );
