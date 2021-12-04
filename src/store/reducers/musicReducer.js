import actionTypes from '../actions/actionTypes';

const initState = {
   
    
    track : [],
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TRACK_SUCCESS:

            let track = state.track;

            track = action.listtrack

            return {

                ...state, track,
            }

            case actionTypes.FETCH_ALL_TRACK:
                console.log('action all', action)
               state.track = action.listtracks
            return {

                ...state, track,
            }

        default:
            return state; 
    }
}

export default appReducer;