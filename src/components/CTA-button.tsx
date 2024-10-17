import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'


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
    <Button 
    disabled={isLoading}
    className={cn(
     isLoading ? "opacity-80" : "opacity-100",
      "" ,
    className
    )} variant={variant} >
        {children}
        {isLoading && <Loader2 className='ml-2 h-4 w-4 animate-spin'/>}
    </Button>
  )
}
