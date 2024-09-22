import { productType } from '@/types'
import axios from 'axios'
import {useQuery, UseQueryResult} from '@tanstack/react-query'
const BASE_URL ="http://localhost:8080"


export const useGetAllCoffee = ():UseQueryResult<productType[]> => {
    return useQuery<productType[]>({
        queryKey:['getAllCoffee'],
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}/v1/api/product`,{
                withCredentials:true
            })
            return response.data
            
        }
    })
}