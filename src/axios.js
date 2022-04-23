import axios from 'axios'


const instance = axios.create({
    baseURL: "http://localhost:5001/ecomm-second/us-central1/api", //cloudfunction URL
    

})

export default instance