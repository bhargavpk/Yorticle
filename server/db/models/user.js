const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        trim: true,
        validate(value){
            if(value === '')
                throw new Error('First name cant be empty!');
            if(!validator.isAlpha(value))
                throw new Error('First name cant have special characters!');
        }
    },
    lastName:{
        type: String,
        trim: true,
        validate(value){
            if(value === '')
                throw new Error('Last name cant be empty!');
            if(!validator.isAlpha(value))
                throw new Error('Last name cant have special characters!');
        }
    },
    userName:{
        type: String,
        validate(value){
            if(value.length < 4)
                throw new Error('Username is too short');
            if(value === 'Anonymous')
                throw new Error("Cant use 'Anonymous' as username!");
        }
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(value.length < 8)
                throw new Error('Password is too short!')
            if(validator.isAlphanumeric(value))
                throw new Error('Password must contain at least one special character!')
        }
    },
    tokens:[String]
})

userSchema.methods.getAuthToken = async function(){
    const token = await jwt.sign({id: this._id.toString()}, '##yorticle##',{expiresIn: "5 days"});
    this.tokens = this.tokens.concat(token);
    return token;
}

userSchema.pre('save',async function(next){
    if(this.isModified('password'))
        this.password = await bcrypt.hash(this.password,8)
    next()
})

const User = new mongoose.model('User',userSchema);

module.exports = User;
