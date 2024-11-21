"use client"

import {toast} from "@/hooks/use-toast"
import {ContactFormSchema} from "@/lib/types"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, SubmitHandler} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem} from "../ui/form"
import {Input} from "../ui/input"
import CTAButton from "../CTA-button"
import MaxWidthWrapper from "../max-width-wrapper"

export function Contact() {
  return (
    <MaxWidthWrapper className='max-w-screen-md'>
      <div id='contact' className='p-10 my-12  flex-col'>
        <h1 className='text-4xl text-slate-800 font-bold text-center mb-5'>
          Contact us
        </h1>

        <p className='mb-8 font-light text-center text-slate-500'>
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>

        <div className='px-10 pb-5'>
          <h1 className='text-xl font-bold text-slate-700'>Email:-</h1>
          <h2 className='text-lg font-semibold text-slate-500'>
            contactus@email.com
          </h2>
        </div>
        <div className='px-10 pb-5'>
          <h1 className='text-xl font-bold text-slate-700'>Phone:-</h1>
          <h2 className='text-lg font-semibold text-slate-500'>1123457678</h2>
          <h2 className='text-lg font-semibold text-slate-500'>2343464765</h2>
        </div>
        <div className='px-10'>
          <h1 className='text-xl font-bold text-slate-700'>Adress:-</h1>
          <h2 className='text-lg font-semibold text-slate-500'>
            contactus@email.com
          </h2>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
