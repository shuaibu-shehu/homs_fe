import React from 'react'
import MaxWidthWrapper from '../max-width-wrapper'
import { LucideMonitor } from 'lucide-react'

function Features() {
  return (
    <MaxWidthWrapper className=' mt-6'>
        <h1  className=' text-center font-bold text-3xl'>Features</h1>
       <div>
          <div className='flex flex-col items-center text-left gap-4 w-[300px] leading-7 border-2 p-2 rounded-lg'>
            <LucideMonitor color='green'  size={40} />
            <div>
            Monitor individual patient oxygen consumption in real time, ensuring each patient receives the exact amount of oxygen they need based on their condition. The data is tracked live to allow immediate response by healthcare providers.
            </div>
          </div>
       </div>
   </MaxWidthWrapper>
  )
}

export default Features