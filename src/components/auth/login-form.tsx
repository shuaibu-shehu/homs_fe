'use client'

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { SignUpFormSchema } from '@/lib/types';
import CTAButton from '../CTA-button';
import { Label } from '../ui/label';
import Link from 'next/link';
import { actionSignUpUser } from '@/lib/actions/auth';

function LoginForm() {
    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: ''},
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
            await actionSignUpUser(data);
        // await new Promise((resolve) => setTimeout(resolve, 7000));
        // console.log(loading);
        // console.log(data);
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
                    Submit
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
