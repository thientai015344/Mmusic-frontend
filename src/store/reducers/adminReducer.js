import actionTypes from '../actions/actionTypes';

const initialState = {
   roleId : []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ETCH_SONGTOPLAYLIST_START:
            return {
                ...state,
                
            }

        case actionTypes.FETCH_SONGTOPLAYLIST_SUCCESS:
        return {
            
            ...state,
            
            }

        case actionTypes.FETCH_SONGTOPLAYLIST_FAILED:
        return {
            ...state,   
            
            }
       
        default:
            return state;
    }
}

export default adminReducer;