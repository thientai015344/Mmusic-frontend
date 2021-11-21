import axios from "../axios"



//template string
const getALLTrack = (inputId) => {
    return axios.get(`/api/get-all-track?id=${inputId}`)
}

const createNewTrack = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-track', data);
}

const deleteTrack = (TrackId) => {
    return axios.delete('/api/delete-track',{
        // headers: {Authorization: authorizationToken},
        data: {id: TrackId}


    });
}

const editTrack = (data) => {
    return axios.put('/api/edit-track',data);
}

const getALLsINGERForTrack = (inputData) => {
    return axios.get(`/api/get-all-singerfortrack?id=${inputData}`)
}

export {
    getALLTrack, 
    createNewTrack,
    deleteTrack,
    editTrack,
    getALLsINGERForTrack,
    



}