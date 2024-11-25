import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Droplet, Wind } from 'lucide-react'

const impacts = [
    {
        icon: Leaf,
        title: "Reduced Carbon Footprint",
        description: "Our system helps hospitals minimize oxygen waste, directly contributing to a lower carbon footprint."
    },
    {
        icon: Droplet,
        title: "Water Conservation",
        description: "By optimizing oxygen production, we indirectly help conserve water used in the oxygen generation process."
    },
    {
        icon: Wind,
        title: "Energy Efficiency",
        description: "Smart monitoring leads to more efficient oxygen distribution, reducing overall energy consumption."
    }
]

export default function EnvironmentalImpact() {
    return (
        <section className="py-16 bg-green-50 px-3">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Our Environmental Impact</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {impacts.map((impact, index) => (
                        <Card key={index} className="border-green-200">
                            <CardContent className="flex flex-col items-center text-center p-6">
                                <impact.icon className="w-12 h-12 mb-4 text-green-600" />
                                <h3 className="text-xl font-semibold mb-2">{impact.title}</h3>
                                <p className="text-muted-foreground">{impact.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

