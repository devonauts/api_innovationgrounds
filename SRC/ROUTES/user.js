//  archivo para entutamiento 
// conexiones 
const express = require('express');
const router = express.Router();
const user = require('./MODELS/user.js');
const bcrypt = require('bcrypt');
const jwt= require('jwt-simple');
const momt= require('moment');
const middleware = require('./middleware.js');

// rutas de archivo comprobando conexión 

router.get('/', async (req,res)=>{
    const user =  await user.getAll();
    res.json(user);
});

router.get('/register', async (req,res)=>{
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user =  await user.insert(req.body);
    res.json(result);
});

const createToken= (user) =>{
    let playload ={
        userId : user.id,
        createAt: moment().unix(),
        expiresAt: moment().add(1,'day').unix()
    }
    return jwt.encode(playload, process.env.TOKEN_KEY);
};

router.post('/login', async (req, res)=>{
    const user = await user.getEmail(req.body.email);
    if(user == undefined){
        res.json({status: 'User not found, verify the email or password'});
    }else{
        const equals = bcrypt.compareSync(req.body.password, user.password);
        if(!equals){
            res.json({status: 'User not found, verify the email or password'});
        }else{
            res.json({
                succesfull :  createToken(user),
                done: 'login'
            });
        }
    }
});

router.use(middleware.checkToken);
router.get('/mainUser',(req,res)=>{
    user.getId(red.userId)
    .then(rows =>{
        res.json(rows);
    })
    .catch(err => console.log(err));
});

module.exports = router;
/*
router.put('/:id', (req, res)=>{
    const { name, address, email, phone_num, password} = req.body;
    const {id} = req.params;
    const query= `
        CALL userEdit(?, ?, ?, ?, ?, ?);
    `;
    sqlcon.query(query,[id, name, address, email, phone_num, password], (err, rows, fields)=>{
        if(!err){
            res.json({status: 'User updated'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res)=>{
    const { name, address, email, phone_num, password} = req.body;
    const {id} = req.params;
    sqlcon.query('DELETE * FROM user WHERE id = ?',[id], (err, rows, fields)=>{
        if(!err){
            res.json({status: 'Deleted'});
        }else{
            console.log(err);
        }
    });
});*/
