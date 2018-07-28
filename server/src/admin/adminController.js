import  adminModel  from "./adminModel";
import bcrypt from "bcryptjs";

class Admin {

}

//get All Admin details
Admin.prototype.index = (req, res) => {
    adminModel.find({},(err, result) => {
        if (err){
            res.send(err);            
        }else{
            res.send({success : true, msg : "users fetched successfully",result});            
        }
    })
}

//get Admin details by Id
Admin.prototype.getAdminById = (req, res) => {
    let id = req.params.id;
    adminModel.findById(id,(err, result) => {
        if (err){
            res.send(err);            
        }else{
            res.send(result);            
        }
    });
}

//update admin details by Id
Admin.prototype.updateAdminById = (req, res) => {
    let id = req.body._id;
    let obj = req.body;
    obj.password = bcrypt.hashSync(obj.password); 

    adminModel.findByIdAndUpdate(id, {
        name: obj.name,
        email: obj.email,
        mobile:obj.mobile,
        password: obj.password,
        role: obj.role
    }, {
        new: true
    },(err, result) => {
        if (err){  
            res.send(err);
        }else{
            res.send(result);            
        }
    });

}

//delete admin details by Id
Admin.prototype.deleteAdminById = (req, res) => {
    let id = req.params.id;
    adminModel.findByIdAndRemove(id,(err, result) => {
        if (err)  {
            res.send(err);
        }else{
            res.send({success : true, msg : "user has been deleted successfully",result});            
        }
    });

}

//New admin Register
Admin.prototype.registerAdmin = (req, res) => {
    let adminObj = req.body;    
    let admin = new adminModel(adminObj);

    admin.save().then((err, result) => {
        if (err){
            res.send(err);
        }else{
            res.send(result);            
        }
    });
}

//login Admin
Admin.prototype.loginAdmin = (req,res) => {
    let adminObj = req.body;
    let email = req.body.email;
    let password = req.body.password;
            adminModel.findOne({email : email}).lean().exec((err,admin) =>{

            if(err){
                res.send(err);
            }
            else if(!admin) {
                let data = {
                    success:false,
                msg : "Invalid adminname and password"
                };  
                res.send(data);
        }else{

                bcrypt.compare(password, admin.password,  (err, result) => {
                if (result === true) {
                     admin.success = true;
                     admin.msg = "Your adminname and password successfully";

                res.send({success : true, msg : "login successfull",result : admin});

                } else {

                    let data = {
                        success:false,
                    msg : "Invalid password"
                    };  
                   res.send(data);
                }
              });

        }
       
  });

 }


module.exports = Admin;