Drop Database if exists burgers_db;
Create DATABASE burgers_db;
use burgers_db;
create table burgers (
  id int not null auto_increment primary key,
  burger_name varchar (30),
  devour boolean default false
);
