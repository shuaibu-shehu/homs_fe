'use client'

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HospitalOnboardingFormSchema } from '@/lib/types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


function HospitalOnboardingForm() {
    
  const form = useForm<z.infer<typeof HospitalOnboardingFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(HospitalOnboardingFormSchema),
    defaultValues: { contactEmail: '', contactPhone: '', name: '', address: ''},
  });


const onSubmit = (data: z.infer<typeof HospitalOnboardingFormSchema>) => {
  console.log(data)
}
    return (
    
    <Form
     {...form}
     >

      <form 
      className=' flex flex-col gap-3 w-full max-w-[500px] border-2 p-6 rounded-lg border-green-700'
      onSubmit={form.handleSubmit(onSubmit)}>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                {...field}
                placeholder="Hospital's  name"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                {...field}
                placeholder="Enter phone"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                {...field}
                placeholder=" Enter email"/>
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
              <FormControl>
                <Input 
                {...field}
                placeholder="Enter address"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='bg-green-900 hover:bg-green-900 hover:opacity-90 transition-all mt-2'>Submit</Button>
      </form>
    </Form>
  )
}

export default HospitalOnboardingForm
