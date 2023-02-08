//  archivo para el manejo de los métodos de peticiones de la base de datos al archivoc
const sqlcon = require("../DB/database");
const express = require('express');

const getAll= () =>{
    return new Promise ((res,req)=>{
        sqlcon.query('SELECT * FROM USER',(err, rows, fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    });
};
// registro de usuario

const insert =({ id, name, address, email, phone_num, password}) =>{
    return new Promise((res,req)=>{
        sqlcon.query('INSERT INTO user (id, name, address, email, phone_num, password) VALUES (?, ?, ?, ?, ?, ?)', [id, name, address, email, phone_num, password] ,(err, result)=>{
            if(!err){
                resolve(result);
            }else{
                console.log(err);
            }
        });
    });
}

// obtener el usuario por el email
const getEmail= ('/email',(res,req) => {
   const {email} = req.params;
   sqlcon.query('SELECT * FROM user WHERE email = ? ', [email], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

// obtener el usuario por el id
const getId= ('/id',(res,req) => {
    const {id} = req.params;
    sqlcon.query('SELECT * FROM user WHERE id = ? ', [id], (err, rows, fields)=>{
         if(!err){
             res.json(rows[0]);
         }else{
             console.log(err);
         }
     });
 });

module.exports= {
    getAll: getAll,
    insert: insert,
    getEmail: getEmail,
    getId: getId
};