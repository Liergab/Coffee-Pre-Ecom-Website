import { loginFormProps } from '@/pages/PublicPages/Login'
import { registerFormProps } from '@/pages/PublicPages/Register'
import { VerificationFormProps } from '@/pages/PublicPages/Verification'
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