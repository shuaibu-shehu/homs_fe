import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
    {
        quote: "This system has revolutionized how we manage oxygen in our ICU. It's not just about efficiency; it's about providing better care.",
        author: "Dr. James Wilson",
        position: "ICU Director, Metro General Hospital"
    },
    {
        quote: "The predictive analytics have been a game-changer. We're now proactive rather than reactive in our oxygen management.",
        author: "Nurse Maria Garcia",
        position: "Head Nurse, City Medical Center"
    }
]

export default function Testimonials() {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">What Healthcare Professionals Say</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <blockquote className="text-lg mb-4">&quot;{testimonial.quote}&quot;</blockquote>
                                <cite className="block text-right">
                                    <span className="font-semibold">{testimonial.author}</span>
                                    <br />
                                    <span className="text-sm text-muted-foreground">{testimonial.position}</span>
                                </cite>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

