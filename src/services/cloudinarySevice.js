import axios from "../axios"




const createNewSinger = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-singer', data);
}



export {
  
    createNewSinger,
  
    



}