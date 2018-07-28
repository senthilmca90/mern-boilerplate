import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home'

import Customers from './components/Customer/customers'
// import CreateCustomer from './components/Customer/CreateCustomer'
import CustomerDetails from "./components/Customer/CustomerDetails";
import ProductForm from './components/Product/ProductForm';
import Products from './components/Product/Products'
import LoginForm from './components/User/LoginForm'
import Dashboard from './components/User/Dashboard'
import {PrivateRoute} from "./PrivateRoute";

const routing = () =>(
    <div>
    <Switch>
        <Route  exact path="/" component={Home} label="Home"/>
        <Route path="/customers" component={Customers} />
        <Route path="/customer/view" component={CustomerDetails} />
        <Route path="/customer/new" component={CustomerDetails} />

        <Route path="/products" component={Products} />
        <Route path="/product/edit" component={ProductForm} />
        <Route path="/product/new" component={ProductForm} />

        <PrivateRoute path="/dasshboard" component={Dashboard} />


        <Route path="/login" component={LoginForm} />
    
    </Switch>
    </div>
)
export default routing;


