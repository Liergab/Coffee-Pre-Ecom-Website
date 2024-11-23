import { productType } from '@/types'
import axios from 'axios'
import {useQuery, UseQueryResult} from '@tanstack/react-query'
import { EditCoffeeFormData } from '@/components/Form/EditCoffee'
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

export const useCreateCoffeeProduct = async(coffeeData:FormData) => {
    const response = await axios.post(`${BASE_URL}/v1/api/product`, coffeeData,{
        headers:{
            'content-type':'multipart/form-data'
        },
        withCredentials:true
    })

    return response.data
}


export const useDeleteCoffeeProduct = async(coffeeId:string) => {
    const response = await axios.delete(`${BASE_URL}/v1/api/product/${coffeeId}`,{
        withCredentials:true
    })
    return response.data
}


export const useGetAllCoffeeProductById = (Id:string):UseQueryResult<productType> => {
    return useQuery<productType>({
        queryKey:['getCoffeeProductById', Id],
        enabled:!!Id,
        queryFn: async() => {
            const response = await axios.get(`${BASE_URL}/v1/api/product/${Id}`,{
                withCredentials:true
            })
            return response.data
        }
    })
}

export const useUpdateCoffeeProduct = async({ Id, coffeeData }: { Id: string, coffeeData: FormData }) => {
    const response = await axios.put(`${BASE_URL}/v1/api/product/${Id}`, coffeeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
    });

    return response.data;
};