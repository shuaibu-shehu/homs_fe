"use client"

import React from "react"
import {Form, FormControl, FormField, FormItem, FormMessage} from "../ui/form"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {Input} from "../ui/input"
import {LoginFormSchema} from "@/lib/types"
import CTAButton from "../CTA-button"
import Link from "next/link"
import {actionLoginInUser} from "@/lib/actions/auth"
import {useToast} from "@/hooks/use-toast"
function LoginForm() {
  const {toast} = useToast()
 
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {email: "", password: ""},
  })
  
  const loading = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const res = await actionLoginInUser(data)

      if (res?.success) {
        window.location.href = `/list/home`
        toast({
          title: "Login successful",
          description: "You have successfully logged in",
        })
      } else {
        toast({
          title: "Login failed",
          description: res?.message,
        })
      }
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-9 w-full max-w-[500px] '
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <h2 className='block mb-1 text-sm font-semibold text-gray-600'>
                Your email
              </h2>
              <FormControl>
                <Input {...field} placeholder='Email' />
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
                Enter your password
              </h2>
              <FormControl>
                <Input {...field} placeholder='Password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CTAButton
          isLoading={loading}
          className='bg-custome-green-300 hover:bg-slate-800 hover:opacity-90 gap-5 transition-all mt-2'>
          Login
        </CTAButton>
        <div className='h-5 border-b-2 border-slate-300  text-center'>
          <span className='bg-white px-5 text-slate-500'>or</span>
        </div>
        <p className=' text-gray-600 text-sm'>
          Don't have an account?{" "}
          <Link className=' text-blue-500 font-bold' href={"/signup"}>
            Signup
          </Link>
        </p>
      </form>
    </Form>
  )
}

export default LoginForm
