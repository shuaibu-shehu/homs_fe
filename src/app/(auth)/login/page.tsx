import LoginForm from "@/components/auth/login-form"
import {Footer} from "@/components/footer"
import {PageWrapper} from "@/components/pagewrapper"
import React from "react"

function Page() {
  return (
    <div>
      <PageWrapper
        title='Welcome back'
        discription='Login in to access your account'
        imageSrc='/login.png'
        altText='login image'>
        <LoginForm />
      </PageWrapper>
    </div>
  )
}

export default Page
