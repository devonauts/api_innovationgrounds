const sqlcon = require("../DB/database");
const express = require('express');


const getAll= () =>{
    return new Promise ((res,req)=>{
        sqlcon.query('SELECT * FROM services',(err, rows, fields)=>{
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

const request =({ id, name, descrip}) =>{
    return new Promise((res,req)=>{
        sqlcon.query('INSERT * INTO services (id, name, descrip) VALUES (?, ?, ?, ?, ?, ?)', [id, name, descrip] ,(err, result)=>{
            if(!err){
                resolve(result);
            }else{
                console.log(err);
            }
        });
    });
}

const  quit =({id, name, descrip}) => {
    return new Promise((res, req) =>{
        sqlcon.query('DELETE * FROM services WHERE id = ?', [id]);
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item eliminado":results.affectedRows});
        }
    });
};
const update = ({id, name, descrip}) => {
    return new Promise((res, req)=> {
        sqlcon.query('UPDATE services SET (id, name, descrip) VALUES (?, ?, ?, ?, ?, ?) ',[id, name, descrip], (err, rows, fields)=>{
            if(!err){
                res.json({status: 'Services updated'});
            }else{
                console.log(err);
            }
        });
    })
   
};

module.exports= {
    getAll: getAll,
    getId : getId,
    request: request,
    quit: quit,
};
