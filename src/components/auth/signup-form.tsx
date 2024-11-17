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
import { useToast } from '@/hooks/use-toast';

function SignUpForm() {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: ''},
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
          const res=  await actionSignUpUser(data);
        
        if (res?.message) {
            toast({
                title: "Signup",
                description: res.message
            })
        }

        if (res?.error) {
            toast({
                title: "Signup",
                description: res.error.split(":")[1],
            })
        }
        
    };

    return (
        <Form {...form}>
            <form 
                className='flex flex-col gap-3 w-full max-w-[500px] border-2 p-6 rounded-lg border-green-700'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <Label className='text-gray-600'>Name</Label>
                            <FormControl>
                                <Input 
                                    {...field}
                                    placeholder=" Username"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    {...field}
                                    placeholder="Confirm Password"
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
                    lready have an account <Link className=' text-green-950 font-bold' href={'/login'} >
                    Signin</Link>
             </p>
            </form>
        </Form>
    );
}

export default SignUpForm;
