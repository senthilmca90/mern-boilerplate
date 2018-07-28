import { combineReducers } from 'redux'
import customers from "./customerReducer";
import  products from "./ProductReducer";
import  users from "./UserReducer";
const rootReducer = combineReducers({
  customers,
  products,
  users
})

export default rootReducer
