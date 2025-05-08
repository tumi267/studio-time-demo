// app/page.js

import ParticleEffectImage from "./components/Hero/ParticleEffectImage";
import LandgingGalleryLeft from "./components/LandingGallaeryLeft/LandingGalleryLeft";
import LangingGallery from "./components/LandingGallery/LangingGallery";
import ParallaxSection from "./components/ParallaxSection/ParallaxSection";
import StudioTestimonialsSlider from "./components/TestimonialSlider/TestimonialSlider";

export default function Home() {
  return (
    <main className="relative">
      {/* Parallax Section 1 */}
      <ParallaxSection
        imageUrl="https://plus.unsplash.com/premium_photo-1663956045546-80dd104c018f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG11c2ljJTIwZXF1aXBtZW50fGVufDB8fDB8fHww"
        title="Our Recording Studio"
        description="Professional environment for artists to create their best work"
      />

      {/* Content Section */}
      <div className="py-20 bg-white">
        <StudioTestimonialsSlider/>
      </div>

      {/* Parallax Section 2 */}
      <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1581997743789-a3870a2e3eae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG11c2ljJTIwZXF1aXBtZW50fGVufDB8fDB8fHww"
        title="Premium Equipment"
        description="State-of-the-art gear for professional sound quality"
      />

      {/* More Content Sections */}
      <div className="py-20 bg-gray-100">
        <LangingGallery/>
      </div>

      {/* Final Parallax Section */}
      <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        title="Create With Us"
        description="Book your session today and bring your music to life"
      />

      {/* Final Content Section */}
      <div className="py-20 bg-white">
        <LandgingGalleryLeft/>
      </div>
    </main>
  )
}