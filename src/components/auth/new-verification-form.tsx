'use client'

// import { newVerification } from '@/lib/server-actions/auth-actions';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from './ui/use-toast';
import { Loader2, LockIcon, MailWarning, WarehouseIcon } from 'lucide-react';
// import 
// import { Button } from '../ui/button';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import { useToast } from '@/hooks/use-toast';
import { newVerification } from '@/lib/actions/auth';

function NewVerificationForm() {
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const { toast } = useToast()
    const searchParams = useSearchParams();
    const tokenId = searchParams.get('id');

    console.log("token id", tokenId);


    const onSubmit = useCallback(async () => {
        if (!tokenId) return
        newVerification(tokenId)
            .then((data) => {
                if (data && data.error) {
                    setError(data.error)
                    return toast({ title: 'error', description: data.error })
                }
                if (data && data.success) setSuccess(data.success)
                toast({ title: 'success', description: data.success })
            }).catch((error) => {
                setError('something went wrong')
                toast({ title: 'error', description: "something went wrong" })
            })
    }, [tokenId, toast])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <form className=' w-full sm:w-[400px] flex space-y-6 pt-20  flex-col gap-2 justify-center items-center'>
            <h1 className=' text-5xl text-bold text-center flex justify-center items-center gap-6'>< LockIcon width={70} height={70} /> Auth</h1>

            {!success && !error && (
                // <Loader/>
                <BeatLoader color='white' />
            )}
            {error && (<div className=' flex bg-red-300 gap-3 p-2 text-center rounded-sm text-lg '>
                <MailWarning /> {error}
                {success && <div className='text-green-500'>{success}</div>}
            </div>)}

            <div className='text-lg  p-2'>go back to <Link href={'/login'}> login page </Link></div>
        </form>
    )
}

export default NewVerificationForm