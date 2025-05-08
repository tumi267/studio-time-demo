'use client'

import { Button } from '@/components/ui/button'
import ParallaxSection from './ParallaxSectionAdmin/ParallaxSection'
import StudioTestimonialsSliderAdmin from './TestimonialSliderAdmin/TestimonialSlider'
import LangingGalleryAdmin from './LandingGallery/LangingGalleryAdmin'
import LandgingGalleryLeftAdmin from './LandingGallaeryLeft/LandingGalleryLeftAdmin'
import HeroSectionAdmin from './HeroSection/HeroSection'
import StudioFeaturesAdmin from './StudioFeaturesAdmin/StudioFeaturesAdmin'
import RoomShowcaseAdmin from './RoomShowcaseAdmin/RoomShowcaseAdmin'
import EquipmentListAdmin from './EquipmentListAdmin/EquipmentListAdmin'
import AboutHeroAdmin from './AboutHeroAdmin/AboutHeroAdmin'
import StudioHistoryAdmin from './StudioHistoryAdmin/StudioHistoryAdmin'
import TeamSectionAdmin from './TeamSectionAdmin/TeamSectionAdmin'
import ValuesSectionAdmin from './ValuesSectionAdmin/ValuesSectionAdmin'
import ParallaxBackground from './ParallaxContactAdmin/ParallaxContactAdmin'
import ContactForm from '../contact/ContactForm'
import SocialLinksAdmin from './SocialLinksAdmin/SocialLinksAdmin'
import ContactInfoAdmin from './ContactInfoAdmin/ContactInfoAdmin'
import MapEmbed from './MapEmbedAdmin/MapEmbedAdmin'
import ClientsHeroAdmin from './ClientsHeroAdmin/ClientsHeroAdmin'
import ClientsGridAdmin from './ClientsGridAdmin/ClientsGridAdmin'
import { useState } from 'react'
import ClientDetailAdmin from './ClientDetailAdmin/ClientDetailAdmin'
import GalleryGridAdmin from './GalleryGridAdmin/GalleryGridAdmin'
function PagePreview({ isedit, pageid, moduleid }) {
  const [selectedClient, setSelectedClient] = useState(0)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[90%] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{pageid}</h2>
          <Button variant="ghost" onClick={() => {
            isedit(false)
            moduleid(null)
          }}>
            Close
          </Button>
        </div>

        {/* page edit here*/}
{/* landing */}
        {pageid=='landing'&&<div>
        <ParallaxSection
        imageUrl='https://plus.unsplash.com/premium_photo-1663956045546-80dd104c018f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG11c2ljJTIwZXF1aXBtZW50fGVufDB8fDB8fHww'
        title='Our Recording Studio'
        description='Professional environment for artists to create their best work' 
        />
        <StudioTestimonialsSliderAdmin
        />
        <ParallaxSection
        imageUrl='https://images.unsplash.com/photo-1581997743789-a3870a2e3eae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG11c2ljJTIwZXF1aXBtZW50fGVufDB8fDB8fHww'
        title='Premium Equipment'
        description='State-of-the-art gear for professional sound quality' 
        />
        <LangingGalleryAdmin
        />
        <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        title="Create With Us"
        description="Book your session today and bring your music to life"
      />
      <LandgingGalleryLeftAdmin/>
        </div>
        }

{/* studio */}
                {pageid=='studio'&&<div>
        <HeroSectionAdmin/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StudioFeaturesAdmin />
        <RoomShowcaseAdmin />
        <EquipmentListAdmin />
      </div>
        </div>
        }
        {/* about */}
                {pageid=='about'&&<div>
                <div className="bg-studio-950 text-studio-100">
       <AboutHeroAdmin />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <StudioHistoryAdmin />
        <TeamSectionAdmin />
        <ValuesSectionAdmin />
       
      </div>
      </div>
        </div>
        }
        {/* client */}
                {pageid=='client'&&<div>
                <div className="bg-studio-900 min-h-screen">
      <ClientsHeroAdmin />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Clients Grid - Scrollable */}
          <div className="lg:w-2/3">
            <ClientsGridAdmin
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
          </div>
          
          {/* Client Details - Fixed */}
          <div className="lg:w-1/3 lg:sticky lg:top-8 lg:h-[calc(100vh-64px)] lg:overflow-y-auto">
            <ClientDetailAdmin selectedClient={selectedClient} />
          </div>
        </div>
      </div>
    </div>
        </div>
        }
                {pageid=='contact'&&<div>
                <div className="relative overflow-hidden">
      <ParallaxBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Get in Touch</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <ContactForm />
            <SocialLinksAdmin />
          </div>
          
          <div className="space-y-8">
            <ContactInfoAdmin />
            <MapEmbed />
          </div>
        </div>
      </div>
    </div>
        </div>
        }
        {/* gallery */}
                {pageid=='gallery'&&<div>
                <div className="min-h-screen bg-studio-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-16 text-studio-100">
          Studio Gallery
        </h1>
        <GalleryGridAdmin/>
      </div>
    </div>
        </div>
        }

      </div>
    </div>
  )
}

export default PagePreview
