import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

let productSchema = new Schema({
    productName : {type:String, default : null},
    imageLocation : {type:String, default : null},
},{timestamps : true
});

productSchema.plugin(AutoIncrement, {inc_field: 'productId'});
const product = mongoose.model('product', productSchema);
module.exports = product;