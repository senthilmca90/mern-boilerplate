import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var adminSchema = new Schema({
	name : {type:String,default : null},
	email : {type:String, unique:true},
    password : {type:String},
    mobile : {type : String},
	role:{type:Number,default:0}
});

//hashing a password before saving it to the database
    adminSchema.pre('save', function (next) {
        var admin = this;
        bcrypt.hash(admin.password, 10, function (err, hash){
        if (err) {  
            return next(err);
        }
        admin.password = hash;
        next();
        })
    });
    adminSchema.plugin(AutoIncrement, {inc_field: 'adminId'});

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;