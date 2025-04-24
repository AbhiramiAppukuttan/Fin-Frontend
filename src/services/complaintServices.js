import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
import { getToken } from "../utils/storageHandler";

export const feedbackAPI=async(data)=>{   
    const userToken=getToken()  
    const response=await axios.post(`${BASE_URL}/complaint/add`,data, {
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}



export const getAllComplaintsAPI = async () => {
    const userToken=getToken() 
        const response = await axios.get(`${BASE_URL}/complaint/viewall`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
        return response.data;
};


export const updateComplaintStatusAPI = async (id) => {
    const userToken = getToken();
    const response = await axios.put(
        `${BASE_URL}/complaint/update`, 
        { id }, // Send only the complaint ID
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }
    );
    return response.data;
};
