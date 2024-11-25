import { Card, CardContent } from "@/components/ui/card"
import { Activity, TrendingUp, Shield, Zap } from 'lucide-react'

const features = [
    {
        icon: Activity,
        title: "Real-time Tracking",
        description: "Monitor oxygen levels across your hospital in real-time, ensuring immediate response to changes."
    },
    {
        icon: TrendingUp,
        title: "Predictive Analytics",
        description: "Anticipate oxygen needs and potential issues before they arise with our advanced AI algorithms."
    },
    {
        icon: Shield,
        title: "Enhanced Patient Safety",
        description: "Improve patient care with alerts and insights that help prevent oxygen-related complications."
    },
    {
        icon: Zap,
        title: "Efficiency Boost",
        description: "Optimize oxygen usage and distribution, reducing waste and operational costs."
    }
]

export default function KeyFeatures() {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index}>
                            <CardContent className="flex flex-col items-center text-center p-6">
                                <feature.icon className="w-12 h-12 mb-4 text-green-600" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

