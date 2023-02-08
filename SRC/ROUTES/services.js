const express = require('express');
const router = express.Router();
const services = require('./MODELS/services.js');

router.get('/', async (req,res)=>{
    const services =  await services.getAll();
    res.json(result);
});

router.get('/', async (req,res)=>{
    const services =  await services.getId(req.body.id);
    res.json(result);
});

router.get('/request', async (req, res)=>{
    console.log(req.body);
    const services = await services.request();
    res.json(result);
});

router.get('/delete', async (req, res)=>{
    console.log(req.body);
    const services = await services.quit();
    res.json(result);
});

router.put('/:id', async(req, res)=>{
    console.log(req.body);
    const services= await services.update();
    res.json(result);
});

module.exports = router;
