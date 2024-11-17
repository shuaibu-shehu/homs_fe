'use client'

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { LoginFormSchema } from '@/lib/types';
import CTAButton from '../CTA-button';
// import { Label } from '../ui/label';
import Link from 'next/link';
import { actionLoginInUser } from '@/lib/actions/auth';
// import { useAuth } from '../providers/authProvider';
import { useToast } from '@/hooks/use-toast';

function LoginForm() {
    const {toast} = useToast()
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(LoginFormSchema),
        defaultValues: { email: '', password: ''},
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
        try {
            const res = await actionLoginInUser(data);
            
            console.log(res);
            if (res?.success) {
                toast({
                    title: 'Login successful',
                    description: 'You have successfully logged in',
                })
            } else {
                toast({
                    title: 'Login failed',
                    description: res?.message,
                })
            }
            
        } catch (error) {
            
            console.log("error: ",error);
        }
    };

    return (
        <Form {...form}>
            
            <form 
                className='flex flex-col gap-9 w-full max-w-[500px] border-2 p-6 rounded-lg border-green-700'
                onSubmit={form.handleSubmit(onSubmit)}
            >

                
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    {...field}
                                    placeholder="Email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    {...field}
                                    placeholder="Password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            
                <CTAButton 
                    isLoading={loading}
                    className='bg-green-900 hover:bg-green-900 hover:opacity-90 gap-5 transition-all mt-2'
                >
                    Login
                </CTAButton>
                <p className=' text-gray-600 text-sm'>
                    create an account <Link className=' text-green-950 font-bold' href={'/signup'} >
                    Signup</Link>
             </p>
            </form>
        </Form>
    );
}

export default LoginForm;
