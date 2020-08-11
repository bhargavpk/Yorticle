const express = require('express');
const User = require('../../db/models/user');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/signup', async (req,res) => {
    const user = new User(req.body);
    try{
        const anotherUser = await User.findOne({userName: req.body.userName});
        if(anotherUser)
            throw new Error('Username has already been taken!')
        const token = await user.getAuthToken();
        await user.save();
        res.status(201).send({user ,token});
    }catch(e){
        res.status(400).send({error:e});
    }
})

router.post('/login', async (req,res)=>{
    const {userName, password} = req.body;
    try{
        const user = await User.findOne({userName});
        if(!user)
            throw new Error();
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual)
            throw new Error();
        const token = await user.getAuthToken();
        await user.save();
        res.send({user ,token});
    }catch(e){
        res.status(400).send({error:'Invalid username or password'});
    }
})

router.post('/auth_test', auth, async (req,res) => {
    res.send({user: req.user});
})

router.patch('/logout', auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => { return token !== req.token});
        await req.user.save();
        res.send({});
    }catch(e){
        res.status(400).send({error:e});
    }
})
router.patch('/logout_all', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send({user: req.user})
    }catch(e){
        res.status(400).send();
    }
})

module.exports = router;