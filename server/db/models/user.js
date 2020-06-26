const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
                throw new Error('First name cant have special characters!');
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
                throw new Error('Password is too short!');
            if(!validator.isAlpha(value))
            {
                //Check is alpha numeric handles case where only alphabets in input
                if(validator.isAlphanumeric(value))
                    throw new Error('Password must contain at least one special character');
            }
            else
                throw new Error('Password must  also contain number(s) and special character(s)');
        }
    },
    tokens:[String]
    //Add additional fields(token if required instead of array)
})

userSchema.methods.getAuthToken = async function(){
    const token = await jwt.sign({id: this._id.toString()}, '##yorticle##',{expiresIn: "5 days"});
    this.tokens = this.tokens.concat(token);
    return token;
}

const User = new mongoose.model('User',userSchema);

module.exports = User;
