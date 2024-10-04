import React from 'react'
import CTAButton from '../CTA-button'
import MaxWidthWrapper from '../max-width-wrapper'
import Image from 'next/image'

function Hero() {
  return (
    <MaxWidthWrapper className='flex justify-center flex-col items-center gap-7'>
      <div className=' flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex-1 flex flex-col gap-4'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Optimizing Oxygen Usage for Better Patient Care with Real-Time Monitoring and AI Predictive Analytics
          </h1>
          <p className='text-gray-600'>
            Track and predict oxygen consumption across hospital wards, ensuring timely and efficient oxygen supply for patients.
          </p>
        </div>
        <div className='flex-1'>
          <Image src={"/hero.png"} className='rounded-lg flex-1 w-[400px] h-[400px]' alt='hero'  width={500} height={500} />
        </div>
      </div>

      <CTAButton className=' flex h-[50px] font-bold rounded-lg bg-green-900 hover:bg-green-800 w-60 my-6' >
        <span className='p-5 my-4 text-lg'>
        Get started
        </span>
        </CTAButton>
    </MaxWidthWrapper>
  )
}
export default Hero