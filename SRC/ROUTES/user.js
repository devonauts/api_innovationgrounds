// conexiones 
const express = require('express');
const sqlcon = require('../DB/database');
const router = express.Router();

// rutas de archivo 

router.get('/',(req,res)=>{
    sqlcon.query('SELECT * FROM USER',(err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
router.get('/:id',(req,res)=>{
   const {id} = req.params;
   sqlcon.query('SELECT * FROM user WHERE id = ? ', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});
router.post('/', (req, res)=>{
    const {id, name, address, email, phone_num} = req.body;
    console.log(req.body)
    const query= `
        CALL userEdit(?, ?, ?, ?, ?);
    `;
    sqlcon.query(query,[id, name, address, email, phone_num], (err, rows, fields)=>{
        if(!err){
            res.json({status: 'User saved'});
        }else{
            console.log(err);
        }
    });

});
router.put('/:id', (req, res)=>{
    const { name, address, email, phone_num} = req.body;
    const {id} = req.params;
    const query= `
        CALL userEdit(?, ?, ?, ?, ?);
    `;
    sqlcon.query(query,[id, name, address, email, phone_num], (err, rows, fields)=>{
        if(!err){
            res.json({status: 'User updated'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res)=>{
    const { name, address, email, phone_num} = req.body;
    const {id} = req.params;
    sqlcon.query('DELETE * FROM user WHERE id = ?',[id], (err, rows, fields)=>{
        if(!err){
            res.json({status: 'Deleted'});
        }else{
            console.log(err);
        }
    });
});
module.exports = router
