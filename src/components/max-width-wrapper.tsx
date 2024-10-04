import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl mt-10 px-2.5 py-2.5 ',
        className
      )}>
      {children}
    </div>
  )
}
 
export default MaxWidthWrapper