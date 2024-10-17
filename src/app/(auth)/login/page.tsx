import LoginForm from '@/components/auth/login-form'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import React from 'react'

function Page() {
    return (
        <div className='min-w-full flex felx-col justify-center '>
            <MaxWidthWrapper className='flex flex-col justify-center items-center gap-6'>
                <h1 className=' text-3xl m-4'>Signup</h1>
                <LoginForm />
            </MaxWidthWrapper>
        </div>
    )
}

export default Page