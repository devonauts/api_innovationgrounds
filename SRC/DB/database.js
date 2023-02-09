const mysql = require('mysql');
// conexión de la base, datos 
const sqlcon =  mysql.createConnection({
host:'localhost',
user: 'root',
password:'Alan1s:)',
database:'garden'
});

// comprobar la conexión de la base

sqlcon.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected');
    }
});

module.exports = {
    sqlcon: sqlcon
};
