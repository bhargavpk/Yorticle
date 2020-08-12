const express = require('express');
const Article = require('../../db/models/article');
const auth = require('../middleware/auth')
const User = require('../../db/models/user')

const router = new express.Router();

router.post('/article', auth, async (req,res) => {
    try{
        if(!req.query.id){
            req.body.author = req.user.userName;
            const article = new Article(req.body);
            article.publish.canPublish = req.body.publish
            await article.save();
            res.send({article});
        }
        else{
            const article = await Article.findById(req.query.id)
            if(!article)
                throw new Error()
            if(article.author === req.user.userName)
            {
                article.content = req.body.content;
                article.title = req.body.title
                article.publish.canPublish = req.body.publish
                await article.save();
                res.status(201).send({article})
            }
            else
                throw new Error()
        }
    }catch(e){
        res.status(400).send({error:e})
    }
});

router.get('/article', auth, async (req,res) => {
    try{
        const articleArr = await Article.find({'publish.canPublish':true}).sort({updatedAt:-1})
                                        .select('_id title content author').limit(20);
        res.send({articleArr});
    }catch(e){
        res.status(400).send({error:e});
    }
})

router.get('/account/:userName', auth, async (req,res)=>{
    const userName = req.params.userName;
    try{
        const userDoc = await User.findOne({userName}).select('-tokens -password')
        const {firstName, lastName} = userDoc
        var user = {firstName, lastName, userName}
        const articleArr = await Article.find({author:userDoc.userName}).sort({updatedAt:-1}).select('_id title content publish author')
        const articleArr1 = articleArr.filter(article => {
                return article.publish.canPublish
            })
        user.publishCount = articleArr1.length
        if(userName !== req.user.userName)
            res.send({articleList:{articleArr:articleArr1},user})
        else
            res.send({articleList:{articleArr},user})
    }catch(e){
        res.status(400).send({error:e})
    }
})

router.get('/article/:id', auth, async (req,res) => {
    try{
        const article = await Article.findById(req.params.id);
        if(!article)
            throw new Error();
        if((article.author !== req.user.userName)&&(article.publish.canPublish === false))
            throw new Error('Article not published yet')
        res.send({
            article,
            contentEditable: req.user.userName === article.author
        })
    }catch(e){
        res.status(400).send({error:e})
    }
})

router.patch('/review', auth, async (req,res)=>{
    try{
        const article = await Article.findById(req.query.id);
        if(!article)
            throw new Error()
        article.reviews.push({
            reviewAuthor: req.user.userName,
            reviewContent: req.body.content
        })
        await article.save()
        res.status(201).send(article)
    }catch(e){
        res.status(400).send({error:e})
    }
})

module.exports = router;

