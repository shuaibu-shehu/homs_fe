import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { Button } from '../ui/button'


type CustomeSearchProps = {
    buttonText?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void    
}

function CustomeSearch({ buttonText, placeholder, onChange}: CustomeSearchProps) {   
  return (
      <div className='max-w-[515px] flex gap-2 justify-center items-center '>
          <div className='flex rounded-md gap-2 relative border-2 border-custome-green-300 dark:border-gray-700'>
              <Search size={20} className=' text-custome-green-400 absolute top-2 left-2' />
              <Input
                  onChange={onChange}
                  className=' outline-none border-none w-full pl-8'
                  placeholder={placeholder}
              />
          </div>
          {buttonText && <Button className=' bg-custome-green-300 hover:bg-custome-green-300'>{buttonText}</Button>}
    </div>
  )
}

export default CustomeSearch