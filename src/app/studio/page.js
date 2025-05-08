import HeroSection from '../components/studio/HeroSection/HeroSection.js'
import StudioFeatures from '../components/studio/StudioFeatures/StudioFeatures.js'
import RoomShowcase from '../components/studio/RoomShowcase/RoomShowcase.js'
import EquipmentList from '../components/studio/EquipmentList/EquipmentList.js'

import BookingCTA from '../components/studio/BookingCTA/BookingCTA.js'

export default function StudioPage() {
  return (
    <div className="bg-studio-900 text-[#2b2b2b]">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StudioFeatures />
        <RoomShowcase />
        <EquipmentList />
       
        <BookingCTA />
      </div>
    </div>
  )
}