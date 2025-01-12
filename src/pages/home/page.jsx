
import FeaturesSection from './components/Featuresection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/Contact'
import AIResumeHero from './components/Herosection'

export default function Home() {
  return (
    <>
      <AIResumeHero />
      <FeaturesSection />
      <AboutSection />
      
      <ContactSection />
      </>
  )
}