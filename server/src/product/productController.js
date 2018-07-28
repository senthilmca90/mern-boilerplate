import  productModel  from "./productModel";
import fs from "fs";

class Product {

} 

Product.prototype.getProducts = (req,res) => {
    productModel.find({},(err,products) => {
        if(err){
            res.send(err);
        }else{
            console.log("result products", products);
            res.send({'success':true,'message':'Products fetched successfully',products});
        }
    })
}

Product.prototype.getProductById = (req,res) => {
    let id = req.params.id;
    productModel.findById(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

Product.prototype.getProductByCustomId = (req,res) => {
    let id = req.body.id;
    productModel.findOne({productId : id},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send({'success':true,'message':'Product fetched successfully',result});
        }
    })
}

Product.prototype.addProduct = (req,res) => {
    let obj = req.body;
    obj.imageLocation = req.file.path;
    console.log("obj ", obj);
    let model = new productModel(obj);
console.log("model ", model);
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send({'success':true,'message':'Product fetched successfully',result});
        }
    })
}

Product.prototype.updateProductById = (req,res) => {
    let id = req.body._id;
    let obj = req.body;
    let oldImagelocation = null;
    if(req.file){
         oldImagelocation = obj.imageLocation;
        obj.imageLocation = req.file.path;
    }
    // console.log("obj", obj);
    // exit;

    productModel.findByIdAndUpdate(id,{ productName :obj.productName,imageLocation : obj.imageLocation},(err,result) => {
        if(err){
            res.send(err);
        }else{
            if(req.file){
                if(oldImagelocation != null){
                    fs.exists(oldImagelocation, (exists) => {
                        if(exists) {
                            fs.unlinkSync(oldImagelocation);
                        }
                    });
                                    
                }
                
            }
            res.send(result);
        }
    })
}

Product.prototype.deleteProductById = (req,res) => {
    let id = req.body._id;
    console.log("delete product ", req.body);
    productModel.findByIdAndRemove(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

module.exports = Product;
