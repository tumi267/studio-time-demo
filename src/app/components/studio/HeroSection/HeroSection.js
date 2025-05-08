'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
export default function HeroSection() {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1620456175552-c82581ade74e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fG11c2ljJTIwZXF1aXBtZW50fGVufDB8fDB8fHww"
          alt="Professional recording studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            World-Class Recording Studio
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Professional recording environment with state-of-the-art equipment 
            and acoustically treated spaces for perfect sound.
          </p>
          <Link href={'/booking'} className="bg-studio-300 hover:bg-studio-400 text-studio-900 font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Book a Session
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}