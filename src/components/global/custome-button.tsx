import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

type CustomeButtonProps = {
    onClick?: () => void
    isLoading?: boolean
    type?: 'button' | 'submit' | 'reset'
    children?: React.ReactNode
}

function CustomeButton({
    isLoading,
    children,
    type = 'button',
    onClick
}: CustomeButtonProps) {
  return (
      <Button type={type} disabled={isLoading} onClick={onClick} className=' bg-custome-green-300 hover:bg-custome-green-300 felx gap-2'>
          {children}
          {isLoading && <Loader2 size={20} className='animate-spin text-gray-300' />}
      </Button>
  )
}

export default CustomeButton