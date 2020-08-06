const express = require('express');
const Article = require('../../db/models/article');
const auth = require('../middleware/auth')

const router = new express.Router();

router.post('/article', auth, async (req,res) => {
    req.body.author = req.user._id;
    const article = new Article(req.body);
    try{
        await article.save();
        res.send({article});
    }catch(e){
        res.status(400).send({error:e})
    }
});

router.get('/article', auth, async (req,res) => {
    try{
        const articleArr = await Article.find({}).select('_id title content');
        res.send({articleArr});
    }catch(e){
        res.status(400).send({error:e});
    }
})

router.get('/article/:id', auth, async (req,res) => {
    try{
        const article = await Article.findById(req.params.id);
        if(!article)
            throw new Error('');
        res.send({
            article,
            contentEditable: req.user._id.toString() === article.author.toString()
        })
    }catch(e){
        res.status(400).send({error:e})
    }
})

module.exports = router;

