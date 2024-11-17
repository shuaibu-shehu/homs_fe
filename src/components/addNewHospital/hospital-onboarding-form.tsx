'use client'

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import CTAButton from '../CTA-button';
import { Label } from '../ui/label';
import { actionAddHospital } from '@/lib/actions/actions';
import { HospitalOnboardingSchema } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

function HospitalOnboardingForm() {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof HospitalOnboardingSchema>>({
        mode: 'onChange',
        resolver: zodResolver(HospitalOnboardingSchema),
        defaultValues: {
            hospitalName: '',
            address: '',
            city: '',
            state: '',
            country: '',
            contactPerson: '',
            contactNumber: '',
            email: '',        },
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof HospitalOnboardingSchema>) => {
        const res = await actionAddHospital(data);
        if (res?.success) {
            toast({ title: 'Success', description: res.message })
        } else {
            toast({ title: 'Error', description: res.message })
        }

    };

    return (
        <Form {...form}>
            <form
                className='flex flex-col gap-6 w-full max-w-7xl border-2 p-6 mx-auto rounded-lg border-green-700'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className='w-full grid gap-3 md:grid-cols-2'>

                    {/* Basic Information Section */}
                    <div className="flex gap-3 flex-col">
                        <h2 className="font-semibold text-lg text-center">Basic Information</h2>
                        <FormField
                            control={form.control}
                            name="hospitalName"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Hospital Name</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter hospital name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Address</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter address" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>City</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter city" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>State</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter state" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Country</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter country" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Contact Information Section */}
                    <div className="flex gap-3 flex-col">
                        <h2 className="font-semibold text-lg text-center">Contact Information</h2>
                        <FormField
                            control={form.control}
                            name="contactPerson"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Contact Person</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter contact person's name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Contact Number</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter contact number" />
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
                                    <Label>Email</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter email address" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                  
                </div>

                {/* Submit Button */}
                <CTAButton
                    isLoading={loading}
                    className='bg-green-900 w-96 hover:bg-green-900 hover:opacity-90 gap-5 transition-all mt-2'
                >
                    Submit
                </CTAButton>
            </form>
        </Form>
    );
}

export default HospitalOnboardingForm;
