import React, { Component } from 'react';
import {connect } from 'react-redux';
import {addCustomer} from '../../actions/customerAction'
import FormValidator from "../../FormValidator";
class CreateCustomer extends Component {

    constructor() {
        super();

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

        this.state = {
            customer : {
                firstName : "",
                lastName : "",
                validation: this.validator.valid()
            },
            
        };
        this.submitted = false;

        

        this.handleChangeFor = this.handleChangeFor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChangeFor = (propertyName) => (event) => {
        const { customer } = this.state;
        const customerDetails = {
          ...customer,
          [propertyName]: event.target.value
        };
        this.setState({ customer: customerDetails });
      }
      
      handleSubmit(event) {
        event.preventDefault();
        console.log("test ", this.state.customer)
        const validation = this.validator.validate(this.state.customer);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
        this.props.addCustomer(this.state.customer);

        }
      }
      render() {
        let validation = this.submitted ?                  
        this.validator.validate(this.state.customer) :  
        this.state.customer.validation                   

        console.log("validation ", validation);

        return (
          <form onSubmit={this.handleSubmit}>
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
            <div>
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
              SAVE
            </button>
          </form>
        );
      }
}

const mapStateToProps = (state) => ({
  customer: state.customer
})

const mapDispatchToProps = (dispatch) => ({
    addCustomer: (data) => dispatch(addCustomer(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer);