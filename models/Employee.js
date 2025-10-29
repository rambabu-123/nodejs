const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    //id nmae,email,phone,postion,city
 id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     phoneNumber:{
        type:Number,
       default:false
    },
     city:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Employee',employeeSchema);