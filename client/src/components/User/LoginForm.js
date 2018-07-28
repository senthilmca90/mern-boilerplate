import React, { Component } from 'react';
import {connect } from 'react-redux';
import {login} from '../../actions/UserAction'
import FormValidator from "../../FormValidator";
import history from "../../history";
class CreateUser extends Component {

    constructor() {
        super();

        this.validator = new FormValidator([
            { 
              field: 'email', 
              method: 'isEmpty', 
              validWhen: false, 
              message: 'Please enter first name' 
            },
            { 
              field: 'password', 
              method: 'isEmpty', 
              validWhen: false, 
              message: 'Please enter last name.'
            }
          ]);

        this.state = {
            user : {
                email : "",
                password : "",
                validation: this.validator.valid()
            },
            
        };
        this.submitted = false;

        

        this.handleChangeFor = this.handleChangeFor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChangeFor = (propertyName) => (event) => {
        const { user } = this.state;
        const userDetails = {
          ...user,
          [propertyName]: event.target.value
        };
        this.setState({ user: userDetails });
      }
      
      handleSubmit(event) {
        event.preventDefault();
        console.log("test ", this.state.user)
        const validation = this.validator.validate(this.state.user);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
        this.props.login(this.state.user).then((data) => {
            console.log("user data ",data);
            if(data.success == true){
            localStorage.setItem('user', JSON.stringify(data.result));
                history.push('/');
            }else{
                alert(data.msg);
            }

            // this.setState({ jokes });
          });

        }
      }
      render() {
        let validation = this.submitted ?                  
        this.validator.validate(this.state.user) :  
        this.state.user.validation                   

        console.log("validation ", validation);

        return (
            <div className="row">
            <div className="col-lg-4">
            </div>
            <div className="col-lg-4">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={"form-control " + (validation.email.isInvalid && 'is-invalid')}
                id="email"
                name="email"
                autoComplete="off"
                onChange={this.handleChangeFor('email')} value={this.state.user.email}
                />
                <small className="text-danger">{validation.email.message}</small>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={"form-control " + (validation.password.isInvalid && 'is-invalid')}
                id="password"
                name="password"
                autoComplete="off"
                onChange={this.handleChangeFor('password')} value={this.state.user.password}
                />
                <small className="text-danger">{validation.password.message}</small>
            </div>
            <br/>
            <button type="submit" className="btn btn-success btn-lg">
              LOGIN
            </button>
          </form>
          </div>
          <div className="col-lg-4">
          </div>
          </div>
        );
      }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(login(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);