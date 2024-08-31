import { loginFormProps } from '@/pages/PublicPages/Login'
import { registerFormProps } from '@/pages/PublicPages/Register'
import { VerificationFormProps } from '@/pages/PublicPages/Verification'
import { userType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const BASE_URL ="http://localhost:8080"

export const useLoginApi = async(userData:loginFormProps) => {
    const response = await axios.post(`${BASE_URL}/v1/api/login`, userData, {
        headers:{
            'content-type':'application/json'
        },
        withCredentials:true
    })

    return response.data
}

export const useRegisterApi = async(userData:registerFormProps) => {
    const response = await axios.post(`${BASE_URL}/v1/api/register`, userData, {
        headers:{
            'content-type':'application/json'
        },
        withCredentials:true
    })

    return response.data
}


export const useVerifyAccountApi = async(code:VerificationFormProps) => {
    const response = await axios.post(`${BASE_URL}/v1/api/email-verify`, code,{
        headers:{
            'content-type':'application/json'
        },
        withCredentials:true
    })

    return response.data
}

export const useCurrentUserApi = () => {
    return useQuery({
        queryKey:['currentUser'],
        queryFn:async():Promise<userType>=>{
            const response = await axios.get(`${BASE_URL}/v1/api/user/current-user`,{
                withCredentials:true
            })
            return response.data
        },
        retry: false, 
    })
}

export const useLogoutApi = async() => {
    const reponse = await axios.get(`${BASE_URL}/v1/api/logout`,{
        withCredentials:true
    })

    return reponse.data
}