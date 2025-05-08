'use client'

import Link from 'next/link'

export default function BookingCTA() {
  return (
    <section className="py-16">
      <div className="bg-studio-800 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Book Your Session?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Contact us to discuss your project and reserve studio time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/booking"
            className="bg-studio-300 hover:bg-studio-400 text-studio-900 font-bold py-3 px-8 rounded-full transition-colors"
          >
            Book Now
          </Link>
          <Link 
            href="/contact"
            className="border border-studio-300 hover:bg-studio-700  font-bold py-3 px-8 rounded-full transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}