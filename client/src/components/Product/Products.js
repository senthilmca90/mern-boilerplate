import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getProducts, deleteProduct} from '../../actions/ProductAction'
import './products.css';
import history from "../../history"
import { API_URL } from "../../constants/ActionTypes";

class Products extends Component {

    constructor(props){
        super(props);
        this.viewProduct = this.viewProduct.bind(this);
    }
    componentDidMount() {
        this.props.getProducts();
    }
    static propTypes = {
        getProducts: PropTypes.func.isRequired,
        products: PropTypes.object.isRequired
    }

  deleteProduct(product){
      console.log(`delete product `, product);
      this.props.deleteProduct(product);
  }
  viewProduct = (viewProductDetails) => {
    console.log("this.state ", viewProductDetails);
     history.push('/product/edit', {'product' : viewProductDetails})
  }

  render() {

    const { products } = this.props.products;

    const  productList = (
        <div>
          
        <div className="col-lg-12 table-responsive">
        <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
        {
            products.map((product,index) =>
            <tr key={index}>
                <td>{product.productName}</td>
                <td>
                <img src={API_URL+product.imageLocation} height="100" width="100"/>
                </td>
                <td> <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(product)}> </i>   &nbsp;
                <i className="fa fa-trash btn btn-danger" onClick={()=>this.deleteProduct(product)}> </i></td>
            </tr>
            )
        }
        
        </tbody>
      </table>
      </div>
        </div>
        )


    return (
      <div className="row">
      <div className="col-lg-12">
              <Link to={`/product/new`} >
                    <button className="btn btn-success pull-right" >New Product</button>
              </Link>
        </div>
        <div className="col-lg-12 text-center">
            {
                products.length ==0 ? 'No Products Create New Products' :productList
            }
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products
})

const mapDispatchToProps = (dispatch) => ({
   getProducts: () => dispatch(getProducts()),
   deleteProduct: (product) => dispatch(deleteProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);
