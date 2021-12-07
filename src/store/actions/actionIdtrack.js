import actionTypes from './actionTypes';





export const getIdTrack = (idtrack) => ({
    idtrack ,
    type: actionTypes.FETCH_ID_SUCCESS
})


export const RESIdTrack = (idtrack) => ({

    type: actionTypes.FETCH_ID_TRACK,
    tracks : idtrack
})

