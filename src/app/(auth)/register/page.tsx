import HospitalOnboardingForm from '@/components/auth/hospital-onboarding'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import React from 'react'

function Page() {
  return (
    <div className='min-w-full flex felx-col justify-center '>
      <MaxWidthWrapper className='flex flex-col justify-center items-center gap-6'>
        <h1 className=' text-3xl m-4'>Welcome <span className='wave'>🖐</span>!</h1>
        <h1>Lets unboradr your Hospita  😊</h1>
        <p>Fill out the form below to create your account</p>
        <HospitalOnboardingForm/>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page