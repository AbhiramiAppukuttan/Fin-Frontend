import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
import { getToken } from "../utils/storageHandler";

export const addTransactionAPI=async(data)=>{   
    const userToken=getToken()  
    const response=await axios.post(`${BASE_URL}/transaction/add`,data, {
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const viewTransactionAPI=async()=>{
    const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/transaction/viewall`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}


export const editTransactionAPI = async (data) => {
    const userToken = getToken();  

    const response = await axios.put(`${BASE_URL}/transaction/update`, data,  // ✅ Data is passed correctly as the second argument
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",  // ✅ Optional, ensures proper content type
            },
        }
    );

    return response.data;
};

export const deleteTransactionAPI=async(data)=>{
    const userToken=getToken()  
    const response=await axios.delete(`${BASE_URL}/transaction/delete/${data}`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}