import AboutHero from '../components/about/AboutHero.js'
import StudioHistory from '../components/about/StudioHistory.js'
import TeamSection from '../components/about/TeamSection.js'
import ValuesSection from '../components/about/ValuesSection.js'
import ContactCTA from '../components/about/ContactCTA.js'

export default function AboutPage() {
  return (
    <div className="bg-studio-950 text-studio-100">
      <AboutHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <StudioHistory />
        <TeamSection />
        <ValuesSection />
     
        <ContactCTA />
      </div>
    </div>
  )
}