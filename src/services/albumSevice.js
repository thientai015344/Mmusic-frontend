import axios from "../axios"



//template string
const getALLAlbum = (inputId) => {
    return axios.get(`/api/get-all-album?id=${inputId}`)
}

const getDetailAlbum = (inputId) => {
    return axios.get(`/api/get-detail-album-by-id?id=${inputId}`)
}

const createNewAlbum = (data) => {
    return axios.post('/api/create-new-album', data);
}

const deleteAlbum = (albumId) => {
    return axios.delete('/api/delete-album',{
        // headers: {Authorization: authorizationToken},
        data: {id: albumId}


    });
}

const editAlbum = (data) => {
    return axios.put('/api/edit-album',data);
}


const createAddTrack = (data) => {
    return axios.post('/api/create-new-track-for-album', data);
}


export {
    getALLAlbum, 
    createNewAlbum,
    deleteAlbum,
    editAlbum,
    createAddTrack,
    getDetailAlbum,



}