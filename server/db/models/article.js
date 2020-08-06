const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: String,
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
    autocompleteTrie:{
        root: mongoose.Schema.Types.Mixed
    },
    suggestions:[{
        suggestionAuthor:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        suggestionContent:{
            type: String,
            required: true
        }
    }]
},{
    timestamps: true    //Get createdAt and updatedAt timestmaps
});

const Article = new mongoose.model('Article', articleSchema);

module.exports = Article;