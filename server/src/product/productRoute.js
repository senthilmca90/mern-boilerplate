import express from "express";
import productController from "./productController";
import multer from "multer";
import fs from "fs";

const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
    let dir = './uploads/products';
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: function (req, file, callback) {
      callback(null,  Date.now()+file.originalname);
    }
  });
  const upload = multer({ storage : storage});

const router = express.Router();
const controller = new productController();

router.post('/', upload.single('image'), controller.addProduct);
router.get('/',controller.getProducts);
router.get('/:id',controller.getProductById);
router.get('/custom/:id',controller.getProductByCustomId);
router.put('/', upload.single('image'), controller.updateProductById);
router.delete('/',controller.deleteProductById);

module.exports = router;


