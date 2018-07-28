import express from 'express';
import customerRoute from "../customer/customerRoute";
import productRoute from "../product/productRoute";
import adminRoute from "../admin/adminRoute";

const app = express();

app.use('/customers',customerRoute);
app.use('/products',productRoute);
app.use('/admins',adminRoute);

module.exports = app;