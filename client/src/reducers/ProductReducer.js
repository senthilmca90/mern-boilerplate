import {GET_PRODUCTS, VIEW_PRODUCT, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from '../constants/ActionTypes'
const initialState = {
    products : [],
    product : {}
}
const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_PRODUCT:
            return {
                ...state,
                products : [...state.products,...action.payload]
            }
        case GET_PRODUCTS:
        return {
            ...state,
            products : action.payload,
            product : {}
        }

        case DELETE_PRODUCT:
            let products = state.products.filter(product =>
                product._id !== action.payload._id
            )
            return {
                ...state,
                products : products
            }

        case UPDATE_PRODUCT:
        return {
            ...state,
           product : {},
           refreshList : false
        };

      case VIEW_PRODUCT:
            return {
                ...state,
                products : action.payload,
                product : {
                }
            };
      default:
        return state
    }
}

export default ProductReducer;