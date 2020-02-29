const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address'
        ],
        unique: true,
        required: [true, 'Please add an email']
    },
    role: {
        type:String,
        enum:['user', 'publisher'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', UserSchema);