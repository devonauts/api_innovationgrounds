const sqlcon = require("../DB/database");
const express = require('express');


const getAll= () =>{
    return new Promise ((res,req)=>{
        sqlcon.query('SELECT * FROM purchase',(err, rows, fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    });
};

const getId= ('/id',(res,req) => {
    const {id} = req.params;
    sqlcon.query('SELECT * FROM services WHERE id = ? ', [id], (err, rows, fields)=>{
         if(!err){
             res.json(rows[0]);
         }else{
             console.log(err);
         }
     });
 });

 const getDate= ('/date',(res,req) => {
    const {id} = req.params;
    sqlcon.query('SELECT * FROM services WHERE date = ? ', [date], (err, rows, fields)=>{
         if(!err){
             res.json(rows[0]);
         }else{
             console.log(err);
         }
     });
 });

const request =({ id, date, user, value}) =>{
    return new Promise((res,req)=>{
        sqlcon.query('INSERT * INTO services (id, date, user, value) VALUES (?, ?, ?, ?,)', [id, date, user, value] ,(err, result)=>{
            if(!err){
                resolve(result);
            }else{
                console.log(err);
            }
        });
    });
}

const  quit =({ id, date, user, value}) => {
    return new Promise((res, req) =>{
        sqlcon.query('DELETE * FROM services WHERE id = ?', [id]);
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"compra eliminada":results.affectedRows});
        }
    });
};


module.exports= {
    getAll: getAll,
    getId : getId,
    getDate: getDate,
    request: request,
    quit: quit,
};