const {Schema , model} = require('mongoose');

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim: true,
        max: 20,
    },
    lastName:{
        type:String,
        required:true,
        trim: true,
        max: 20,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    phone:{
        type:String
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    address:String,
    profilePic:{
        type:String,
        default:''
    },
    birthDate:{
        type:Date
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User = model('User', userSchema);

module.exports = User;