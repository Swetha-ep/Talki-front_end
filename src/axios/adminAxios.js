import axios from "axios";
import {adminAPI} from '../constants/api'

const adminInstance = axios.create({
    baseURL:adminAPI ,
    timeout:10000 ,
    timeoutErrorMessage : "Request  timed out after 10 sec"
})

adminInstance.interceptors.request.use((req)=>{
    if(localStorage.getItem('admin')){
        const admin = localStorage.getItem('admin')
        req.headers.Authorization = admin 
    }
    return req
})
export default adminInstance