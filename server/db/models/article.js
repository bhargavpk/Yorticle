const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewAuthor:{
        type:String,
        required:true
    },
    reviewContent:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    publish:{
        canPublish:{
            type: Boolean,
            default: false
        },
        asAnon:{
            type: Boolean,
            default: false
        }
    },
    reviews:[reviewSchema]
},{
    timestamps: true    //Get createdAt and updatedAt timestmaps
});

const Article = new mongoose.model('Article', articleSchema);

module.exports = Article;