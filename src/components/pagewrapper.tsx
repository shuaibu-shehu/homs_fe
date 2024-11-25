import {title} from "process"
import {ReactNode} from "react"

interface PageWrapperProps {
  children: ReactNode
  title: string
  discription: string
  imageSrc: string
  altText: string
}

export function PageWrapper({
  children,
  imageSrc,
  altText,
  title,
  discription,
}: PageWrapperProps) {
  return (
    <div className='flex h-screen flex-col sm:flex-row'>
      {/* First Div: Text Content */}
      <div className='flex-1 flex justify-center sm:justify-end pt-10 sm:pr-10'>
        <div className='flex flex-col gap-5 w-3/4 sm:w-1/2'>
          <h1 className='text-4xl text-slate-700 font-extrabold'>{title}</h1>
          <p className='text-slate-500 pb-5'>{discription}</p>
          {children}
        </div>
      </div>

      {/* Second Div: Image */}
      <div className='flex justify-center sm:justify-start pt-10  sm:flex-1 hidden sm:block'>
        <img
          src={imageSrc}
          alt={altText}
          className='max-w-full sm:h-4/6 md:h-3/4 object-contain rounded-xl'
        />
      </div>
    </div>
  )
}
