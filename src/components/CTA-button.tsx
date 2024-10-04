import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'


type variant = "default" | "secondary"| "outline" | "ghost" | "link"| "destructive"
interface CTAButtonProps {
  variant?: variant
  className?: string
  isLoading?: boolean
  children?: React.ReactNode
}
export default function CTAButton({
  children,
  variant,
  className,
  isLoading = false
  
}:CTAButtonProps) {
  return (
    <Button className={className} variant={variant} >
        {children}
        {isLoading && <Loader2 className='ml-2 h-4 w-4 animate-spin'/>}
    </Button>
  )
}
