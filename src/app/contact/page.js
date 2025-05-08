import ParallaxBackground from '../components/contact/ParallaxBackground.js';
import ContactForm from '../components/contact/ContactForm.js';
import ContactInfo from '../components/contact/ContactInfo.js';
import SocialLinks from '../components/contact/SocialLinks.js';
import MapEmbed from '../components/contact/MapEmbed.js';

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <ParallaxBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Get in Touch</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <ContactForm />
            <SocialLinks />
          </div>
          
          <div className="space-y-8">
            <ContactInfo />
            <MapEmbed />
          </div>
        </div>
      </div>
    </div>
  );
}