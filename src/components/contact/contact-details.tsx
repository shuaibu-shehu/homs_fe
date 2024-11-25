import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactDetails() {
    return (
        <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="flex items-center space-x-2">
                <MapPin className="text-green-600" />
                <p>123 Hospital Street, Medical City, HC 12345</p>
            </div>
            <div className="flex items-center space-x-2">
                <Phone className="text-green-600" />
                <p>+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center space-x-2">
                <Mail className="text-green-600" />
                <a href="mailto:info@oxygenmonitor.com" className="hover:underline">
                    info@oxygenmonitor.com
                </a>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                    <a href="#" className="text-green-600 hover:text-green-800">
                        Facebook
                    </a>
                    <a href="#" className="text-green-600 hover:text-green-800">
                        Twitter
                    </a>
                    <a href="#" className="text-green-600 hover:text-green-800">
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>
    )
}

