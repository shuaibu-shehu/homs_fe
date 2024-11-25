import { Card, CardContent } from "@/components/ui/card"

const metrics = [
    { value: "100+", label: "Hospitals Using Our System" },
    { value: "30%", label: "Average Reduction in Oxygen Wastage" },
    { value: "500,000+", label: "Patients Benefited" },
    { value: "99.9%", label: "System Uptime" }
]

export default function ImpactMetrics() {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => (
                        <Card key={index}>
                            <CardContent className="flex flex-col items-center justify-center text-center p-6 h-full">
                                <span className="text-4xl font-bold text-green-600 mb-2">{metric.value}</span>
                                <span className="text-lg">{metric.label}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

