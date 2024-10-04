import React from 'react'
import CTAButton from '../CTA-button'
import MaxWidthWrapper from '../max-width-wrapper'

function Hero() {
  return (
    <MaxWidthWrapper className='flex h-screen  justify-center flex-col items-center gap-7  '>
        <h1 className='text-4xl font-bold text-gray-800'>
        Optimizing Oxygen Usage for Better Patient Care with Real-Time Monitoring and AI Predictive Analytics
        </h1>
        <p className='text-gray-600'>
        Track and predict oxygen consumption across hospital wards, ensuring timely and efficient oxygen supply for patients.
        </p>
       <CTAButton>Get started</CTAButton>
    </MaxWidthWrapper>
  )
}

export default Hero