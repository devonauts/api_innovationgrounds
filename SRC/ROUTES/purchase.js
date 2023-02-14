const express = require('express');
const router = express.Router();
const purchase = require('./MODELS/purchase.js');

router.get('/', async (req,res)=>{
    const purchase =  await purchase.getAll();
    res.json(result);
});

router.get('/id', async (req,res)=>{
    const purchase =  await purchase.getId(req.body.id);
    res.json(result);
});

router.get('/date', async (req,res)=>{
    const purchase =  await purchase.getDate(req.body.id);
    res.json(result);
});

router.get('/request', async (req, res)=>{
    console.log(req.body);
    const services = await services.request();
    res.json(result);
});

router.get('/delete', async (req, res)=>{
    console.log(req.body);
    const purchase = await purchase.quit();
    res.json(result);
});


module.exports = router;
