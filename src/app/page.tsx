import Features from "@/components/home/features"
import Hero from "@/components/home/hero"

export default function Home() {
  return (
    <div className=' min-h-screen  pb-3'>
      <div className='bg-custome-silver-100 sm:p-16 '>
        <Hero />
      </div>
      <Features />
    </div>
  )
}
