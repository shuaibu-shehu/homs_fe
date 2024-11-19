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

export function ContactForm() {
  //const toast=useToast()

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  })

  const loading = form.formState.isSubmitting

  //write form input functionality

  type ContactFormInputs = z.infer<typeof ContactFormSchema>

  // Define onSubmit function
  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log("Form Data:", data)
  }

  //

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
        <Form {...form}>
          <form
            className='flex flex-col gap-2'
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <h2 className='block mb-1 text-sm font-medium text-gray-900'>
                    Your email
                  </h2>
                  <FormControl>
                    <Input
                      {...field}
                      className='bg-gray-50'
                      placeholder='user@email.com'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='subject'
              render={({field}) => (
                <FormItem>
                  <h2 className='block mb-1 text-sm font-medium text-gray-900'>
                    Subject
                  </h2>
                  <FormControl>
                    <Input
                      {...field}
                      className='bg-gray-50'
                      placeholder='Let us know how we can help you'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='message'
              render={({field}) => (
                <FormItem>
                  <h2 className='block mb-1 text-sm font-medium text-gray-900'>
                    Your Message
                  </h2>
                  <FormControl>
                    <textarea
                      id='message'
                      rows={6}
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300  focus:border-slate-800'
                      placeholder='Leave a comment...'></textarea>
                  </FormControl>
                </FormItem>
              )}
            />

            <CTAButton
              isLoading={loading}
              className='bg-custome-green-300 hover:bg-slate-800 gap-5 transition-all mt-2'>
              Send message
            </CTAButton>
          </form>
        </Form>
      </div>
    </MaxWidthWrapper>
  )
}
