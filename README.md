#Table rendering for Kanalservice

------

###To install this repository open terminaland write 
 >git clone https://github.com/syantovich/Test-task-for-kanalservice.git
 ----
####Before installing, make sure you have PostgreSQL installed and that you have access to the DB
 -[Documentation to install and create DB](https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_PostgreSQL.htm)
 To create table for this project write 
>CREATE TABLE  yourNameTable(
id  SERIAL PRIMARY KEY,
date Date,
name VARCHAR(255),
numberOf INT,
distance FLOAT
);

while you connected to DB

--------
###Create .env file in backend folder and fill it up:

 > PORT_SERVER=***       --->default 8080
> <p><p/>
 >PASSWORD_DB="********"
 > <p><p/>
 >HOST="*****"       --->default localhost
 > <p><p/>
 >USER_DB="*****"        --->default postgres
 > <p><p/>
 >PORT_DB=****        --->default 5432
 > <p><p/>
 >NAME_DB="*****"
 > <p><p/>
  >NAME_TABLE="*****"

--------
###In file 
>/frontend/src/constants/constants.js

####Change variable SERVER_API if you need for default using
>http://localhost:8765/

-------
Open second terminal in this repository 

In the first terminal write
- >cd frontend 

- > npm start
  
In the second terminal write 
- >cd backend

- > node index.js

--------------

#### If you want to add an element to your table go to "http://yourHost/admin/additem"
#### In other cases, by going to the address "http://yourHost/somthinOrNothing" you will get a rendered table



