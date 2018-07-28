import express from "express";
import adminController from "./adminController";

const router = express.Router();

const controller = new adminController();

router.get('/',controller.index);

router.post('/',controller.registerAdmin);

router.get('/:id',controller.getAdminById);

router.put('/',controller.updateAdminById);

router.delete('/:id',controller.deleteAdminById);

router.post('/login',controller.loginAdmin);

module.exports = router;