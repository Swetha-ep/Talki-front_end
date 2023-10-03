import axios from "axios";
import {trainerAPI} from '../constants/api'

 const trainerInstance = axios.create({
    baseURL:trainerAPI ,
    timeout:10000 ,
    timeoutErrorMessage : "Request  timed out after 10 sec"
})

trainerInstance.interceptors.request.use((req)=>{
    if(localStorage.getItem('trainer')){
        const trainer = localStorage.getItem('trainer')
        req.headers.Authorization = trainer 
    }
    return req
})

export default trainerInstance