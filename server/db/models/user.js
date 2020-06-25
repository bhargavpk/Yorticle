const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
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
        required: true,
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
        required: true,
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
    //Add additional fields(token)
})

userSchema.methods.getAuthToken = async function(){
    const token = await jwt.sign({id: this._id.toString()}, '##yorticle##',{expiresIn: "5 days"});
    this.tokens = this.tokens.concat(token);
    return token;
}

userSchema.statics.findByLoginCredentials = async (userName, password) => {
    const user = await User.findOne({userName});
    if(!user)
        throw new Error('Invalid username or password');
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual)
        throw new Error('Invalid username or password');
    return user;
}

userSchema.pre('save', async function(next){
    //isModified true when doc is created or when the field is modified
    
    if(this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 8);
    next();

    //next will trigger next middleware that is save
})

const User = new mongoose.model('User',userSchema);

module.exports = User;
