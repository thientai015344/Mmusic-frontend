import axios from "../axios"



//template string
const getALLPlaylist = (inputId) => {
    return axios.get(`/api/get-all-playlist?id=${inputId}`)
}

// const getALLComment = (inputId) => {
//     return axios.get(`/api/get-comments-track?id=${inputId}`)
// }

// const createNewTrack = (data) => {
//     console.log(data)
//     console.log('check data from service', data)
//     return axios.post('/api/create-new-track', data);
// }

// const createNewCommentTrack = (data) => {
//     console.log(data)
//     console.log('check data from service', data)
//     return axios.post('/api/create-new-comment', data);

// }
// const deleteTrack = (TrackId) => {
//     return axios.delete('/api/delete-track',{
//         // headers: {Authorization: authorizationToken},
//         data: {id: TrackId}


//     });
// }

// const editTrack = (data) => {
//     console.log('dđaaaa',data)
//     return axios.put('/api/edit-track',data);
// }

// const getALLsINGERForTrack = (inputData) => {
//     return axios.get(`/api/get-all-singerfortrack?id=${inputData}`)
// }

export {
    getALLPlaylist, 
    // createNewTrack,
    // deleteTrack,
    // editTrack,
    // getALLsINGERForTrack,
    // createNewCommentTrack,
    // getALLComment,
    
}


