import NewVerificationForm from '@/components/auth/new-verification-form'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import React from 'react'

function page() {
  return (
        <div className='min-w-full flex felx-col justify-center '>
      <MaxWidthWrapper className='flex flex-col justify-center items-center gap-6'>
        <NewVerificationForm />
      </MaxWidthWrapper>
    </div>
   
  )
}

export default page