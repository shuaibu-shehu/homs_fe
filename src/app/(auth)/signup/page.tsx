import SignUpForm from "@/components/auth/signup-form"
import {PageWrapper} from "@/components/pagewrapper"
import React from "react"

function Page() {
  return (
    <PageWrapper
      title='Get Started Now'
      discription='Lets get you all set up'
      imageSrc='/login.png'
      altText='sign up image'>
      <SignUpForm />
    </PageWrapper>
  )
}

export default Page
