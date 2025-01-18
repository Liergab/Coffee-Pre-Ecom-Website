import { ProductSearchResponse, productType } from '@/types'
import axios from 'axios'
import {useQuery, UseQueryResult} from '@tanstack/react-query'
const BASE_URL ="http://localhost:8080"


export type SearchParams = {
    productname  : string;
    page?        : string;
    types?       : string[];
    stars?       : string;
    sortOption?  : string;
    maxPrice?    : string;
}  
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

export const createCoffeeProduct = async(coffeeData:FormData) => {
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


export const useGetSearchProduct =  (searchParams: SearchParams):UseQueryResult<ProductSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("productname", searchParams.productname || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
   

    if (searchParams.stars) {
        if (searchParams.stars.length === 0) {
          queryParams.append('stars', ''); 
        } else {
          searchParams.stars.forEach(star => queryParams.append('stars', star.toString()));
        }
      }

    if (searchParams.types) {
        searchParams.types.forEach(type => queryParams.append("types", type.toString()));
    }
    return useQuery({
        queryKey: ['searchRoom', searchParams],
        queryFn: async (): Promise<ProductSearchResponse> => {
            const response = await axios.get(`${BASE_URL}/v1/api/search?${queryParams}`, {
                withCredentials: true
            });
            return response.data;
        }
    });
}