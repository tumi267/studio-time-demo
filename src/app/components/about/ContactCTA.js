import Link from 'next/link'

export default function ContactCTA() {
  return (
    <section className="bg-studio-900 rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Get in touch to discuss your project or schedule a studio tour
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/contact"
          className="bg-studio-300 hover:bg-studio-400 text-studio-900 font-bold py-3 px-8 rounded-full transition-colors text-center"
        >
          Contact Us
        </Link>
        <Link
          href="/booking"
          className="border border-studio-300 hover:bg-studio-800 font-bold py-3 px-8 rounded-full transition-colors text-center"
        >
          Book a Tour
        </Link>
      </div>
    </section>
  )
}