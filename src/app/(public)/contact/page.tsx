import ContactForm from '@/components/contact/contact-form'
import ContactDetails from '@/components/contact/contact-details'
import Map from '@/components/contact/map'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <header className="text-center mb-12 bg-green-50 p-8 rounded-lg">
                <h1 className="text-3xl font-bold mb-4 text-green-800">Get in Touch with Us</h1>
                <p className="text-xl text-green-600">
                    We&apos;re here to help. Reach out for support, queries, or collaborations regarding our hospital oxygen monitoring system.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-12">
                <ContactForm />
                <div>
                    <ContactDetails />
                    <Map />
                    <div className="mt-8 space-y-4">
                        <Link href="/faq" className="text-primary hover:underline block">
                            Frequently Asked Questions
                        </Link>
                        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                            <Link href="/about">Learn More About Us</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

