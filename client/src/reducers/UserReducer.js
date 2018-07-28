import {GET_USERS, LOGIN_USER, ADD_USER} from '../constants/ActionTypes'
const initialState = {
    users : [],
    user : {}
}
const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_USER:
            return {
                ...state,
                users : [...state.users,...action.payload]
            }
        case GET_USERS:
        return {
            ...state,
            users : action.payload,
            user : {}
        }

        

      case LOGIN_USER:
            return {
                user : action.payload
            };
      default:
        return state
    }
}

export default ProductReducer;