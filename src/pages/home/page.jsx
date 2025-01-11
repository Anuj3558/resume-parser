
import FeaturesSection from './components/Featuresection'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/Testimonial'
import ContactSection from './components/Contact'
import AIResumeHero from './components/Herosection'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <AIResumeHero />
      <FeaturesSection />
      <AboutSection />
      
      <ContactSection />
    </main>
  )
}