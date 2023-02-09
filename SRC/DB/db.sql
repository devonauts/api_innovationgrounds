create database garden;
use garden;

create table user(
id int(11) not null auto_increment,
name varchar(45) default null,
address varchar (45) default null,
email varchar(45) unique,
phone_num int(10) unique,
password varchar(20)unique,
primary key (id),
UNIQUE KEY email_UNIQUE (email),
UNIQUE KEY password_UNIQUE (password)
);
function (err, result) {
           if (err) throw err;
           console.log("User created");
         }
describe user;
insert into user values
(1, 'andres', 'st 23 asds','c@gmail.com', 334244232,taranana);

SELECT * FROM user;

CREATE TABLE ResetPasswordToken ( 
   id INT NOT NULL AUTO_INCREMENT, 
    email VARCHAR(255) NOT NULL, 
    Token_value VARCHAR(350) NOT NULL, 
    created_at datetime  NOT NULL , 
    expired_at datetime  NOT NULL, 
    used INT(11) NOT NULL default "0", 
    inserted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (id),
    UNIQUE INDEX id_UNIQUE (id ASC)); 
    function (err, result) {
        if (err) throw err;
        console.log("resetPasswordToken created");
    }
    
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