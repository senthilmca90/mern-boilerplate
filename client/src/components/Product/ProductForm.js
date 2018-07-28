import React from 'react';
import { updateProduct, addProduct } from '../../actions/ProductAction';
import {connect } from 'react-redux';
import history from '../../history'
import FormValidator from "../../FormValidator";
import { API_URL } from "../../constants/ActionTypes";

class ProductForm extends React.Component {
    constructor(props){
        super(props);
        const location = history.location
        console.log("location in product details ", location);

        this.validator = new FormValidator([
            { 
              field: 'productName', 
              method: 'isEmpty', 
              validWhen: false, 
              message: 'Please enter first name' 
            }
          ]);

        if(this.props.location.pathname == '/product/new'){
            this.state = {
                product : {
                    productName : "",
                    validation: this.validator.valid()
                },
            };
        }else{
            this.state = location.state;
            this.state.product.validation = this.validator.valid()
        }
        this.handleUpdateOrSubmit = this.handleUpdateOrSubmit.bind(this);
        this.submitted = false;
    }

handleChangeFor = (propertyName) => (event) => {
    // console.log("event.target.files[0] ", event.target.files[0]);
//     console.log("this.fileUpload.files[0]", this.fileUpload.files[0])

// if(this.fileUpload.files[0] != null || this.fileUpload.files[0] == undefined){
//     console.log("this.fileUpload.files[0]", this.fileUpload.files[0])
// }
    const { product } = this.state;
    const productDetails = {
      ...product,
      [propertyName]: event.target.value
    };
    this.setState({ product: productDetails});
  }

  handleUpdateOrSubmit(event) {
    event.preventDefault();
    const {product} = this.state;

    console.log("this.state ", this.state)
    console.log("this.props ", this.props)
    let file = this.fileUpload.files[0];
    let formData = new FormData();
   
    if(file != undefined ||  file != null || file != ''){
        formData.append("image", file);
    }
    // for(let pair of formData.entries()) {
    //     console.log(pair[0]+ ', '+ pair[1]); 
    // }
    // formData.append('image', file);
    // console.log("formData ", formData);
   


    const validation = this.validator.validate(this.state.product);
    this.setState({ validation });
    this.submitted = true;
    if (validation.isValid) {
        for(let key in product){
            formData.append(key, product[key]);
        }
           
        if(this.props.location.pathname == '/product/new'){
            console.log("addProduct ", this.state.product);
            this.props.addProduct(formData);
        }else{
            console.log("updateProduct ", this.state.product);
            this.props.updateProduct(formData);
        }
    }
  }

  render(){
    let validation = this.submitted ?                 
    this.validator.validate(this.state.product) :  
    this.state.product.validation     

    const ShowImage = (
        <img src={API_URL+this.state.product.imageLocation} height="100" width="100"/>
    )

    console.log("this.props.location.pathname ", this.props.location.pathname);
    return(
        <div className="productDetail">
            <h2 className="text-center">Product Detail</h2>
            <h5>{this.props.location.pathname == '/product/new'?'Add New Product':'Update New Product'}</h5>
                <div>
                </div>
            {
                <form onSubmit={this.handleUpdateOrSubmit}>
                <div className="form-group">
                  <label htmlFor="productName">First Name</label>
                  <input
                    type="text"
                    className={"form-control " + (validation.productName.isInvalid && 'is-invalid')}
                    id="productName"
                    name="productName"
                    autoComplete="off"
                    onChange={this.handleChangeFor('productName')} value={this.state.product.productName}
                    />
                    <small className="text-danger">{validation.productName.message}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    autoComplete="off"
                    ref={(ref) => this.fileUpload = ref}
                    onChange={this.handleChangeFor('image')}
                    />

                    {this.props.location.pathname == '/product/new'?'':ShowImage}
                    
                </div>
               
                <button type="submit" className="btn btn-success btn-lg">
                {this.props.location.pathname == '/product/new'?'SUBMIT':'UPDATE'}
                </button>

               </form>

              }
            
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      products: state.products
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct : product => dispatch(updateProduct(product)),
        addProduct: product => dispatch(addProduct(product))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProductForm);