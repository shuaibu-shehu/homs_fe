import React from "react"
import CTAButton from "../CTA-button"
import MaxWidthWrapper from "../max-width-wrapper"
import Image from "next/image"

function Hero() {
  return (
    <MaxWidthWrapper className='flex flex-col items-center gap-7 sm:px-4 md:px-8 lg:px-16'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-10 lg:gap-20'>
        {/* Left Section */}
        <div className='flex-1 flex flex-col gap-4 text-center pt-10 md:text-left'>
          <h1 className=' text-3xl md:text-5xl lg:text-6xl font-bold text-[#4d4d4d]'>
            Hospital{" "}
            <span className='text-custome-green-300'>Oxygen Management</span>{" "}
            System
          </h1>
          <p className='text-sm md:text-base lg:text-lg text-[#808080] font-normal'>
            Track and predict oxygen consumption across hospital wards, ensuring
            timely and efficient oxygen supply for patients.
          </p>
        </div>

        {/* Right Section */}
        <div className='flex-1 flex justify-center'>
          <Image
            src={"/hero.png"}
            className='rounded-lg'
            alt='hero'
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Call-to-Action Button */}
      <CTAButton className='flex items-center justify-center h-[50px] font-bold rounded-lg bg-custome-green-300 hover:bg-[#263238] w-48 md:w-60 my-6 animate-bounce'>
        <span className='p-5 my-4 text-base md:text-lg'>Get started</span>
      </CTAButton>
    </MaxWidthWrapper>
  )
}

export default Hero
