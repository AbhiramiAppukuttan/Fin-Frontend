import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
import { getToken } from "../utils/storageHandler";

export const addBudgetAPI=async(data)=>{   
    const userToken=getToken()  
    const response=await axios.post(`${BASE_URL}/budget/add`,data, {
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const viewBudgetAPI=async()=>{
    const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/budget/viewall`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}


export const editBudgetAPI = async (data) => {
    const userToken = getToken();  

    const response = await axios.put(`${BASE_URL}/budget/update`, data,  // ✅ Data is passed correctly as the second argument
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",  // ✅ Optional, ensures proper content type
            },
        }
    );

    return response.data;
};

export const deleteBudgetAPI=async(data)=>{
    const userToken=getToken()  
    const response=await axios.delete(`${BASE_URL}/budget/delete/${data}`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}