create database garden;
use garden;

create table user(
id int(11) not null auto_increment,
name varchar(45) default null,
address varchar (45) default null,
email varchar(45) unique,
phone_num int(10) unique,
primary key (id)
);
describe user;
SELECT *FROM user;

create table purchase(
id int(11) not null auto_increment,
date varchar(45)not null,
user varchar (45)not null unique,
value float(10),
primary key (id)
);
describe purchase;

create table items(
id int(11) not null auto_increment,
name varchar(45) not null,
price float (45) default null,
stock int(45),
primary key (id)
);
describe items;

create table services(
id int(11) not null auto_increment,
name varchar(45) not null,
descrip text (45) default null,
primary key (id)
);
describe services;