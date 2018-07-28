import {GET_PRODUCTS, ADD_PRODUCT,DELETE_PRODUCT, API_URL } from '../constants/ActionTypes';
import axios from "axios";
import history from '../history'

export const getProducts = () => dispatch => {
    return fetch(API_URL+'products')
    .then((response) => {
        return response.json();
       })
      .then(result => {
        console.log("products actions ", result);
        dispatch({
            type: GET_PRODUCTS,
            payload: result.products
          });
      });
    }


    export const addProduct = (product) => {
        console.log("product ", product);
            return (dispatch) => {
                return axios.post(API_URL+'products/', product)
                    .then((res) => {
                        console.log("response ", res);
                        dispatch({ type: ADD_PRODUCT, payload : res.data.result })
                        history.push(`/products`)

                    });
            }
          }
    
    export const updateProduct = (product) => {
            console.log("udpate product product product ", product);
                return (dispatch) => {
                    return axios.put(API_URL+'products/', product)
                        .then((res) => {
                            console.log("response ", res);
                            
                            history.push(`/products`)
                        });
                }
    }

    export const deleteProduct = (product) => {
        return (dispatch) => {
            return axios.delete(API_URL+'products', {data : product})
                .then((res) => {
                    dispatch({ type: DELETE_PRODUCT, payload : product })
                });
        }
    }
