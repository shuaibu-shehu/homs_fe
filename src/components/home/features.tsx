import React from "react"
import MaxWidthWrapper from "../max-width-wrapper"
import {LucideAlertCircle, LucideBarChart2, LucideMonitor} from "lucide-react"

function Features() {
  return (
    <MaxWidthWrapper className=' mt-6'>
      <h1 className=' my-6 text-center font-bold text-4xl p-10 text-[#4d4d4d]'>
        Features
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4'>
        <div className=' h-[350px] bg-[#f5f7fa]  shadow-2xl text-[#4d4d4d] flex flex-col items-center text-left gap-4 max-w-[300px]  leading-7 border-2 p-6 rounded-lg'>
          <LucideMonitor color='#4cac4c' size={40} />
          <div>
            Monitor individual patient oxygen consumption in real time, ensuring
            each patient receives the exact amount of oxygen they need based on
            their condition. The data is tracked live to allow immediate
            response by healthcare providers.
          </div>
        </div>
        <div className='h-[350px] bg-[#f5f7fa] shadow-2xl text-[#4d4d4d] flex flex-col items-center text-left gap-4 max-w-[300px] leading-7 border-2 p-6 rounded-lg'>
          <LucideBarChart2 color='#4cac4c' size={40} />
          <div>
            Keep track of the overall oxygen consumption from the central
            planted tank. The system continuously monitors the tank&apos;s
            levels and usage, allowing for efficient management and timely
            refills, ensuring no interruptions in oxygen supply{" "}
          </div>
        </div>
        <div className='h-[350px] bg-[#f5f7fa]  shadow-2xl text-[#4d4d4d] flex flex-col items-center text-left gap-4 max-w-[300px] leading-7 border-2 p-6 rounded-lg'>
          <LucideAlertCircle color='#4cac4c' size={40} />
          <div>
            Get instant alerts if patient oxygen levels fluctuate or if the
            central tank’s oxygen supply drops below critical levels. These
            real-time notifications help prevent emergencies and ensure
            uninterrupted oxygen delivery{" "}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Features
