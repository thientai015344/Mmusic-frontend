import axios from "../axios"



//template string
const getALLPlaylist = (inputId) => {
    return axios.get(`/api/get-all-playlist?id=${inputId}`)
}

const getALLPlaylistForDetail = (inputId) => {
    return axios.get(`/api/get-all-playlistForDetail?id=${inputId}`)
}

const GetAlllibrytracks = (inputId) => {
    return axios.get(`/api/get-all-librytracks?id=${inputId}`)
}


const getDetailPlaylist = (inputId) => {
    return axios.get(`/api/get-detail-playlist-by-id?id=${inputId}`)
}


const createNewPlaylist = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-playlist', data);
}

const createNewTrackPlaylist = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-add-trackPlaylist', data);
}

const createNewTracklibrytracks = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-add-librytracks', data);
}


const deletePlaylist = (playlistId) => {
    return axios.delete('/api/edit-playlist',{          
        // headers: {Authorization: authorizationToken},
        data: {id: playlistId}
    });
}

const editPlaylist = (data) => {
    console.log('dđaaaa',data)
    return axios.put('/api/edit-track',data);
}



export {
    getALLPlaylist, 
    GetAlllibrytracks,
    createNewPlaylist,
    deletePlaylist,
    editPlaylist,
    getALLPlaylistForDetail,
     getDetailPlaylist,
     createNewTrackPlaylist,
     createNewTracklibrytracks,
    
}


