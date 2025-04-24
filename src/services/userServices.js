import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
import { getToken } from "../utils/storageHandler";

export const registerUserAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/users/register`,data)   
    
    return response.data
}

export const loginUserAPI=async(data)=>{
    
    const response=await axios.post(`${BASE_URL}/users/login`,data, {
        withCredentials: true, 
    })
    return response.data
}

export const logoutAPI=async()=>{
    const response=await axios.delete(`${BASE_URL}/users/logout`)
    console.log('ok');
    return response.data
}

export const addProfileAPI=async()=>{
    const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/users/view`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const profileAPI=async(data)=>{
    const userToken=getToken()  
    const response=await axios.put(`${BASE_URL}/users/edit`,data,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const forgotAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/users/forgot`,data, {
        withCredentials: true, 
    })
    return response.data
}

export const resetAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/users/reset`,data, {
        withCredentials: true, 
    })
    return response.data
}

export const changeAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/users/change`,data, {
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const googleSignupAPI=async()=>{
    const response=await axios.get(`${BASE_URL}/auth/google`, {
        withCredentials: true, 
    })
    return response.data
}

export const planAPI=async()=>{
    const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/users/getplan`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    console.log('API Response:', response.data);
    return response.data
}