import Image from 'next/image'

export default function HeroSection() {
    return (
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
            <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="Healthcare professionals"
                layout="fill"
                objectFit="cover"
                className="z-0"
            />
            <div className="absolute inset-0 bg-green-800 bg-opacity-70 z-10"></div>
            <div className="relative z-20 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Transforming Healthcare with Smart Oxygen Monitoring Solutions
                </h1>
                <p className="text-xl md:text-2xl">
                    Empowering hospitals with real-time insights for optimal patient care
                </p>
            </div>
        </section>
    )
}

