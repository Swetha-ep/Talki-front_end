import axios from "axios";
import {userAPI} from '../constants/api'

const userInstance = axios.create({
    baseURL:userAPI ,
    timeout:10000 ,
    timeoutErrorMessage : "Request  timed out after 10 sec"
})

userInstance.interceptors.request.use((req)=>{
    if(localStorage.getItem('user')){
        const user = localStorage.getItem('user')
        req.headers.Authorization = user 
    }
    return req
})
export default userInstance