import { loginFormProps } from '@/pages/PublicPages/Login'
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