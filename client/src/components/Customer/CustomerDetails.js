import React from 'react';
import { updateCustomer, addCustomer } from '../../actions/customerAction';
import {connect } from 'react-redux';
import history from '../../history'
import FormValidator from "../../FormValidator";

class CustomerDetails extends React.Component {
    constructor(props){
        super(props);
        const location = history.location
        console.log("location in customer details ", location);

        this.validator = new FormValidator([
            { 
              field: 'firstName', 
              method: 'isEmpty', 
              validWhen: false, 
              message: 'Please enter first name' 
            },
            { 
              field: 'lastName', 
              method: 'isEmpty', 
              validWhen: false, 
              message: 'Please enter last name.'
            }
          ]);

        if(this.props.location.pathname == '/customer/new'){
            this.state = {
                customer : {
                    firstName : "",
                    lastName : "",
                    validation: this.validator.valid()
                },
            };
        }else{
            this.state = location.state;
            this.state.customer.validation = this.validator.valid()
        }
        this.handleUpdateOrSubmit = this.handleUpdateOrSubmit.bind(this);
        this.submitted = false;
    }

handleChangeFor = (propertyName) => (event) => {
    const { customer } = this.state;
    const customerDetails = {
      ...customer,
      [propertyName]: event.target.value
    };
    this.setState({ customer: customerDetails });
  }

  handleUpdateOrSubmit(event) {
    event.preventDefault();
    console.log("this.state ", this.state)
    console.log("this.props ", this.props)

    const validation = this.validator.validate(this.state.customer);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
        if(this.props.location.pathname == '/customer/new'){
            console.log("addCustomer ", this.state.customer);
            this.props.addCustomer(this.state.customer);
        }else{
            console.log("updateCustomer ", this.state.customer);
            this.props.updateCustomer(this.state.customer);
        }
    }
  }

  render(){
    let validation = this.submitted ?                 
    this.validator.validate(this.state.customer) :  
    this.state.customer.validation     

    console.log("this.props.location.pathname ", this.props.location.pathname);
    return(
        <div className="customerDetail">

            <h2 className="text-center">Customer Detail</h2>
            <h5>{this.props.location.pathname == '/customer/new'?'Add New Customer':'Update New Customer'}</h5>
            <div className="row">
            <div className="col-lg-4">
            </div>
            <div className="col-lg-4">
                <form onSubmit={this.handleUpdateOrSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className={"form-control " + (validation.firstName.isInvalid && 'is-invalid')}
                    id="firstName"
                    name="firstName"
                    autoComplete="off"
                    onChange={this.handleChangeFor('firstName')} value={this.state.customer.firstName}
                    />
                    <small className="text-danger">{validation.firstName.message}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className={"form-control " + (validation.lastName.isInvalid && 'is-invalid')}
                    id="lastName"
                    name="lastName"
                    autoComplete="off"
                    onChange={this.handleChangeFor('lastName')} value={this.state.customer.lastName}
                    />
                    <small className="text-danger">{validation.lastName.message}</small>
                </div>
               
                <button type="submit" className="btn btn-success btn-lg">
                {this.props.location.pathname == '/customer/new'?'SUBMIT':'UPDATE'}
                </button>

               </form>
               </div>
               <div className="col-lg-4">
               </div>
               </div>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
    return {
      customers: state.customers
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomer : customer => dispatch(updateCustomer(customer)),
        addCustomer: customer => dispatch(addCustomer(customer))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(CustomerDetails);