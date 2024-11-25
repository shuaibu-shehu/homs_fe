'use client'

// import { newVerification } from '@/lib/server-actions/auth-actions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { Loader2, LockIcon, MailWarning } from 'lucide-react';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import { useToast } from '@/hooks/use-toast';
import { newVerification } from '@/lib/actions/auth';

function NewVerificationForm() {
    const [response, setResponse] = useState<{ success?: boolean, message?: string, error?: string, resolution?: string }>({})
    const router = useRouter()
    const { toast } = useToast()
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(true)


    const onSubmit = useCallback(async () => {
        setLoading(true)
        if (!token) return
        const res = await newVerification(token)
        
        if (res) {
            setResponse(res)
        }
             
        if (res && res.success) {
            setLoading(false)
            setTimeout(() => {
                router.push('/login')
            },4000)
            if (res && res.message) {
                toast({ title: 'success', description: res.message })
            }
        }


         setLoading(false)
        
    }, [token, toast])

    useEffect(() => {
        onSubmit()

    }, [onSubmit])
    return (
        <form className=' w-full sm:w-[400px] flex space-y-6 pt-20  flex-col gap-2 justify-center items-center'>
            <h1 className=' text-5xl text-bold text-center flex justify-center items-center gap-6'>< LockIcon width={70} height={70} /> Auth</h1>
            <BeatLoader color="white" />
            {loading && (
                <Loader2 className='animate-spin' />
                // <BeatLoader color='white' />
            )}
            {response.error && (<div className=' flex bg-red-300 gap-3 p-2 text-center rounded-sm text-lg '>
                <MailWarning /> {response.error}
            </div>)}
                
            {!response.success && (<div className=' flex bg-gray-300 gap-3 p-2 text-center rounded-sm text-lg '>
                 {response.message}
            </div>)}
            
            {response.success && !loading && <div className='text-green-500 text-3xl'>{setResponse.message} you will shortly get navigated to login page</div>}

            <div className='text-sm  p-2'>go back to <Link href={'/login'} className='text-blue-700 '> login page </Link></div>
        </form>
    )
}

export default NewVerificationForm