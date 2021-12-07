import axios from "../axios"



//template string
const getALLSinger = (inputId) => {
    return axios.get(`/api/get-all-singer?id=${inputId}`)
}

const getDetailSinger = (inputId) => {
    return axios.get(`/api/get-detail-singer?id=${inputId}`)
}


const createNewSinger = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-singer', data);
}

const deleteSinger = (singerId) => {
    return axios.delete('/api/delete-singer',{
        // headers: {Authorization: authorizationToken},
        data: {id: singerId}


    });
}

const editSinger = (data) => {
    return axios.put('/api/edit-singer',data);
}









export {
    getALLSinger, 
    createNewSinger,
    deleteSinger,
    editSinger,
    getDetailSinger,
    



}