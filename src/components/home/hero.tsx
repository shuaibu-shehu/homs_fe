import React from "react"
import CTAButton from "../CTA-button"
import MaxWidthWrapper from "../max-width-wrapper"
import Image from "next/image"

function Hero() {
  return (
    <MaxWidthWrapper className='flex justify-center flex-col items-center gap-7 '>
      <div className=' flex flex-row justify-between items-center gap-20 '>
        <div className='flex-1 flex flex-col gap-4'>
          <h1 className='text-6xl font-bold text-[#4d4d4d]'>
            Hospital <span className='text-[#4caf4f]'>Oxygen Management </span>
            System
          </h1>
          <p className='text-[#808080] font-normal'>
            Track and predict oxygen consumption across hospital wards, ensuring
            timely and efficient oxygen supply for patients.
          </p>
        </div>
        <div className='flex-1'>
          <Image
            src={"/hero.png"}
            className='rounded-lg flex-1 w-[400px] h-[400px]'
            alt='hero'
            width={500}
            height={500}
          />
        </div>
      </div>

      <CTAButton className=' flex h-[50px] font-bold rounded-lg bg-[#4caf4f] hover:bg-[#263238] w-60 my-6'>
        <span className='p-5 my-4 text-lg'>Get started</span>
      </CTAButton>
    </MaxWidthWrapper>
  )
}
export default Hero
