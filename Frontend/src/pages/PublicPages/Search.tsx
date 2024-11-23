import ComboBoxCategory from '@/components/shared/ComboBoxCategory'
import ComboBoxSort from '@/components/shared/ComboBoxSort'
import ComboBoxStarRating from '@/components/shared/ComboBoxStarRating'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const Search = () => {
  const [selectedFramework, setSelectedFramework] = useState("")

  const handleSelect = (value: string) => {
    setSelectedFramework(value)
    console.log("Selected framework:", value)
  
  }
  return (
    <section>
      <div className='w-full border border-white py-4 px-4 rounded-lg  flex'>
        <Input placeholder='search' className='max-w-xs'/>
        <div className='flex justify-between w-full  max-w-2xl'>
          <ComboBoxStarRating onSelect={handleSelect} />
          <ComboBoxCategory onSelect={handleSelect} />
          <ComboBoxSort onSelect={handleSelect} />
        </div>
      </div>
    </section>
  )
}

export default Search