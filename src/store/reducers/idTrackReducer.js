import actionTypes from '../actions/actionTypes';

const initState = {
   
    
    idtrack : '',
}

const appReducer = (state = initState, action) => {
    console.log('actiooooooo',action)
    switch (action.type) {
        case actionTypes.FETCH_ID_SUCCESS:

            let idtrack = state.idtrack;

            idtrack = action.idtrack

            return {

                ...state, idtrack,
            }

            case actionTypes.FETCH_ID_TRACK:
               state.idtrack = action.listtracks
            return {

                ...state, idtrack,
            }

        default:
            return state; 
    }
}

export default appReducer;