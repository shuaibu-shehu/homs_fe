import { Button } from "@/components/ui/button"
import HeroSection from '@/components/about/hero-section'
import MissionVision from '@/components/about/mission-vision'
import KeyFeatures from '@/components/about/key-features'
import TeamSection from '@/components/about/team-section'
import Testimonials from '@/components/about/testimonials'
import StorySection from '@/components/about/story-section'
import ImpactMetrics from '@/components/about/impact-metrics'
import EnvironmentalImpact from '@/components/about/environmental-impact'
export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow p-12">
                <HeroSection />
                <MissionVision />
                <KeyFeatures />
                <StorySection />
                <ImpactMetrics />
                <EnvironmentalImpact />
                <TeamSection />
                <Testimonials />
                <section className="bg-primary text-primary-foreground py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Oxygen Monitoring?</h2>
                        <Button size="lg" variant="secondary">
                            Get Started
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    )
}

