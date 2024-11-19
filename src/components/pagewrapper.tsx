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
    <div className='flex h-screen '>
      <div className='flex-1 flex justify-center  pt-10'>
        <div className='flex flex-col gap-5 w-1/2 '>
          <h1 className='text-4xl text-slate-700 font-extrabold '>{title}</h1>
          <p className='text-slate-500 pb-5'>{discription}</p>
          {children}
        </div>
      </div>

      <div className='flex-1 bg-slate-200 flex justify-center pt-20'>
        <img
          src={imageSrc}
          alt={altText}
          className='max-w-full h-4/6 object-contain rounded-xl'
        />
      </div>
    </div>
  )
}
