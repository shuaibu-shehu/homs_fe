import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
    {
        name: "Dr. Emily Chen",
        role: "Chief Medical Officer",
        bio: "With over 15 years of experience in critical care, Dr. Chen brings invaluable medical insights to our technology.",
        image: "/placeholder.svg?height=300&width=300"
    },
    {
        name: "Alex Rodriguez",
        role: "Lead Software Engineer",
        bio: "Alex's expertise in IoT and machine learning drives the innovation behind our predictive analytics.",
        image: "/placeholder.svg?height=300&width=300"
    },
    {
        name: "Sarah Johnson",
        role: "Head of Operations",
        bio: "Sarah ensures our system integrates seamlessly into hospital workflows, maximizing its real-world impact.",
        image: "/placeholder.svg?height=300&width=300"
    }
]

export default function TeamSection() {
    return (
        <section className="py-16 bg-green-50 px-3">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <Card key={index}>
                            <CardContent className="flex flex-col items-center text-center p-6">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={150}
                                    height={150}
                                    className="rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <h4 className="text-sm text-muted-foreground mb-2">{member.role}</h4>
                                <p>{member.bio}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

