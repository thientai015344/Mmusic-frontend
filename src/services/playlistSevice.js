import axios from "../axios"



//template string
const getALLPlaylist = (inputId) => {
    return axios.get(`/api/get-all-playlist?id=${inputId}`)
}

const GetAlllibrytracks = (inputId) => {
    return axios.get(`/api/get-all-librytracks?id=${inputId}`)
}



const createNewPlaylist = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-playlist', data);
}

// const createNewCommentTrack = (data) => {
//     console.log(data)
//     console.log('check data from service', data)
//     return axios.post('/api/create-new-comment', data);

//}
// const deleteTrack = (TrackId) => {
//     return axios.delete('/api/delete-track',{
//         // headers: {Authorization: authorizationToken},
//         data: {id: TrackId}


// //     });
// // }

// const editTrack = (data) => {
//     console.log('dđaaaa',data)
//     return axios.put('/api/edit-track',data);
// }

// const getALLsINGERForTrack = (inputData) => {
//     return axios.get(`/api/get-all-singerfortrack?id=${inputData}`)
// }

export {
    getALLPlaylist, 
    GetAlllibrytracks,
    createNewPlaylist,
    // deleteTrack,
    // editTrack,
    // getALLsINGERForTrack,
    // createNewCommentTrack,
    // getALLComment,
    
}


