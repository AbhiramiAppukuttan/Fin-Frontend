import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
import { getToken } from "../utils/storageHandler";


export const paymentAPI=async(data)=>{   
    const userToken=getToken()  
    const response=await axios.post(`${BASE_URL}/payment/checkout`,data, {
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

