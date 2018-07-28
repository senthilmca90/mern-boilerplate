import {GET_USERS, ADD_USER, API_URL, LOGIN_USER } from '../constants/ActionTypes';
import axios from "axios";
import history from '../history'

    export const getUsers = () => dispatch => {
        return fetch(API_URL+'admins')
        .then((response) => {
            return response.json();
        })
        .then(result => {
            console.log("users actions ", result);
            dispatch({
                type: GET_USERS,
                payload: result.users
            });
        });
    }

    export const login = (data) => {
        return (dispatch) => {
            return axios.post(API_URL+'admins/login', data)
                .then((res) => {
                    console.log("response ", res);
                        dispatch({ type: LOGIN_USER, payload : res.data })
                        return res.data;
                   
                    // alert(res.data.msg);
                    // 
                });
        }
    }

    export const addUser = (user) => {
        console.log("user ", user);
            return (dispatch) => {
                return axios.post(API_URL+'admins/', user)
                    .then((res) => {
                        console.log("response ", res);
                        dispatch({ type: ADD_USER, payload : res.data.result })
                        history.push(`/users`)

                    });
            }
          }
    

