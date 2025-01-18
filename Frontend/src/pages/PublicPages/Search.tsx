/* eslint-disable react-hooks/exhaustive-deps */
import ComboBoxCategory from '@/components/shared/ComboBoxCategory'
import ComboBoxSort from '@/components/shared/ComboBoxSort'
import ComboBoxStarRating from '@/components/shared/ComboBoxStarRating'
import { Input } from '@/components/ui/input'
import { useGetSearchProduct } from '@/services/api/product'
import React, { useCallback, useState } from 'react'
import { debounce } from 'lodash' 
import CoffeeProductCard from '@/components/shared/CoffeeProductCard'
import Pagination from '@/components/shared/Pagination'

const Search = () => {
  const [page, setPage] = useState<number>(1)
  const [selectedStar, setSelectedStar] = useState<string>('')
  const [selectedPrice, setSelectedPrice] = useState<string>();
  const [sortOption, setSortOption] = useState<string>("")
  const [productname, SetProductname] = useState<string>('')
  const [debouncedProductName, setDebouncedProductName] = useState<string>('')

  const debounceSearch = useCallback(
    debounce((value: string) => setDebouncedProductName(value), 500),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    SetProductname(value)
    debounceSearch(value)
  }
  const searchParams = {
    productname : debouncedProductName,
    page        : page.toString(),
    stars       : selectedStar,
    maxPrice    : selectedPrice?.toString(),
    sortOption

  } 
  const {data, isLoading} = useGetSearchProduct(searchParams)
   console.log(data)
  return (
    <section>
      <div className='w-full border border-white py-4 px-4 rounded-lg  flex'>
        <Input placeholder='search' value={productname} className='max-w-xs' onChange={handleInputChange }/>
        <div className='flex justify-between w-full  max-w-2xl'>
          <ComboBoxStarRating onSelect={(value:string) => setSelectedStar(value)} />
          <ComboBoxCategory onSelect={(value:string) => setSelectedPrice(value)} />
          <ComboBoxSort onSelect={(value:string) => setSortOption(value)} />
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div> // Optional: Use a spinner or skeleton loader for better UI
      ) : data?.data && data.data.length > 0 ? (
        <div className="mt-10">
          <CoffeeProductCard product={data.data} />
        </div>
      ) : (
        <div className="mt-10 text-center text-gray-500">No data found</div>
      )}

      <div className='mt-10'>
            {data?.pagination?.total  === 0 ? ' ' : <>
              <Pagination page={data?.pagination.page || 1}  pages={data?.pagination.pages || 1} onPageChange={(page) => setPage(page)}/>
            </>}
      </div>
    </section>
  )
}

export default Search