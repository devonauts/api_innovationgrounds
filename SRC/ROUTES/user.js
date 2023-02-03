// conexiones 
const express = require('express');
const {SELECT}  = require('sequelize/types/query-types');
const sqlcon = require('../DB/database');
const router = express.Router();

// rutas de archivo 
router.get('/',(req,res)=>{
    sqlcon.query('SELECT *FROM USER',(err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
module.exports = router