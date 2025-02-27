const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
    },
    role:{
        type:Schema.Types.ObjectId, 
        ref:"roles"

    }

})

module.exports = mongoose.model("user",userSchema)