"use client"

import React from "react"
import {Form, FormControl, FormField, FormItem, FormMessage} from "../ui/form"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {Input} from "../ui/input"
import {SignUpFormSchema} from "@/lib/types"
import CTAButton from "../CTA-button"
import {Label} from "../ui/label"
import Link from "next/link"
import {actionSignUpUser} from "@/lib/actions/auth"
import {useToast} from "@/hooks/use-toast"

function SignUpForm() {
  const {toast} = useToast()
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {name: "", email: "", password: "", confirmPassword: ""},
  })

  const loading = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
    const res = await actionSignUpUser(data)

    if (res?.message) {
      toast({
        title: "Signup",
        description: res.message,
      })
    }

    if (res?.error) {
      toast({
        title: "Signup",
        description: res.error.split(":")[1],
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-5 w-full max-w-[500px] '
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({field}) => (
            <FormItem>
              <h2 className='block mb-1 text-sm font-semibold text-gray-600'>
                Your Name
              </h2>
              <FormControl>
                <Input {...field} placeholder=' Username' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <h2 className='block mb-1 text-sm font-semibold text-gray-600'>
                Email
              </h2>
              <FormControl>
                <Input {...field} placeholder='example@email.com' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <h2 className='block mb-1 text-sm font-semibold text-gray-600'>
                Password
              </h2>
              <FormControl>
                <Input {...field} placeholder='Create a password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({field}) => (
            <FormItem>
              <h2 className='block mb-1 text-sm font-semibold text-gray-600'>
                Confirm Password
              </h2>
              <FormControl>
                <Input {...field} placeholder='Enter your password again' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CTAButton
          isLoading={loading}
          className='bg-custome-green-300 hover:bg-slate-800 hover:opacity-90 gap-5 transition-all mt-2'>
          Submit
        </CTAButton>
        <div className='h-5 border-b-2 border-slate-300  text-center'>
          <span className='bg-white px-5 text-slate-500'>or</span>
        </div>
        <p className=' text-gray-600 text-sm'>
          Already have an account?{" "}
          <Link className=' text-blue-500 font-bold' href={"/login"}>
            Signin
          </Link>
        </p>
      </form>
    </Form>
  )
}

export default SignUpForm
