import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye } from 'lucide-react'

export default function MissionVision() {
    return (
        <section className="py-16 bg-muted px-3">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardContent className="flex items-start p-6">
                            <Target className="w-12 h-12 mr-4 text-primary" />
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                                <p>To revolutionize hospital oxygen management through innovative technology, ensuring every patient receives optimal care while minimizing waste and maximizing efficiency.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-start p-6">
                            <Eye className="w-12 h-12 mr-4 text-primary" />
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
                                <p>A world where advanced oxygen monitoring is the standard in every hospital, leading to improved patient outcomes, reduced healthcare costs, and a more sustainable healthcare system.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

