const express = require('express');
const User = require('../../db/models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/signup', async (req,res) => {
    const user = new User(req.body);
    try{
        const token = await user.getAuthToken();
        await user.save();
        res.status(201).send({user,token});
    }catch(e){
        res.status(400).send(e);
    }
})

router.post('/login', async (req,res)=>{
    const {userName, password} = req.body;
    try{
        const user = await User.findByLoginCredentials(userName, password);
        const token = await user.getAuthToken();
        await user.save();
        res.send({user,token});
    }catch(e){
        res.status(400).send(e);
    }
})

router.post('/auth_test', auth, async (req,res) => {
    res.send({status:'Done'});
})

router.patch('/logout', auth, async (req,res) => {
    try
    {
        req.user.tokens = req.user.tokens.filter(token => { return token !== req.token});
        await req.user.save();
        res.send({status:'Success'});
    }catch(e){
        res.status(400).send({error:e});
    }
})

module.exports = router;