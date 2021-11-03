import actionTypes from './actionTypes';

export const fetchSongPlaylistStart  = () => ({
    type: actionTypes.FETCH_SONGTOPLAYLIST_START
})

export const fetchSongPlaylistSuccess  = () => ({
    type: actionTypes.FETCH_SONGTOPLAYLIST_SUCCESS
})

export const fetchSongPlaylistFailed  = () => ({
    type: actionTypes.FETCH_SONGTOPLAYLIST_FAILED
})

