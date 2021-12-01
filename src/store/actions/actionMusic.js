import actionTypes from './actionTypes';





export const getTrack = (listtrack) => ({
    listtrack ,
    type: actionTypes.FETCH_TRACK_SUCCESS
})


export const RESTrack = (listtrack) => ({

    type: actionTypes.FETCH_ALL_TRACK,
    tracks : listtrack
})

