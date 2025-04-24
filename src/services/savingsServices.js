import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
import { getToken } from "../utils/storageHandler";

export const addSavingsAPI=async(data)=>{   
    const userToken=getToken()  
    const response=await axios.post(`${BASE_URL}/savings/add`,data, {
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}


export const viewSavingsAPI=async()=>{
    const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/savings/get`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const editSavingAPI = async (data) => {
    const userToken = getToken();  

    const response = await axios.put(`${BASE_URL}/savings/update`, data,  // ✅ Data is passed correctly as the second argument
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",  // ✅ Optional, ensures proper content type
            },
        }
    );

    return response.data;
};

  

export const deleteSavingsAPI=async(data)=>{
    const userToken=getToken()  
    const response=await axios.delete(`${BASE_URL}/savings/delete/${data}`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}