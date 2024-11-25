import Image from 'next/image'

export default function StorySection() {
    return (
        <section className="py-16 bg-muted">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Our team working on the oxygen monitoring system"
                            width={600}
                            height={400}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <p className="mb-4">
                            Born from a critical need observed during the global pandemic, our oxygen monitoring system was developed by a team of healthcare professionals and tech innovators. We witnessed firsthand the challenges hospitals faced in managing oxygen supplies efficiently.
                        </p>
                        <p>
                            Driven by a passion to make a difference, we combined cutting-edge IoT technology with medical expertise to create a solution that not only monitors oxygen levels but predicts needs and optimizes usage. Our journey is one of continuous improvement, always striving to enhance patient care and hospital efficiency.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

