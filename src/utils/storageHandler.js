
export const getToken =()=>{
    return sessionStorage.getItem("userToken")
}

export const getUserdata= ()=>sessionStorage.getItem('userToken')
export const userData = getUserdata() ? getUserdata() : null