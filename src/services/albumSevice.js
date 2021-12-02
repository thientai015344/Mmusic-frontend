import axios from "../axios"



//template string
const getALLAlbum = (inputId) => {
    return axios.get(`/api/get-all-album?id=${inputId}`)
}

const createNewAlbum = (data) => {
    console.log(data)
    console.log('check data from service', data)
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


export {
    getALLAlbum, 
    createNewAlbum,
    deleteAlbum,
    editAlbum,
    



}