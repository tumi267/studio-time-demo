'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ClientsHero() {
  return (
    <div className="relative h-64 md:h-96">
      <Image
        src="https://images.unsplash.com/photo-1708192279059-a19f22e16ef1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvbnklMjBNdXNpY3xlbnwwfHwwfHx8MA%3D%3D"
        alt="Our Clients"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Clients</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            We&apos;ve had the privilege of working with some of the best in the industry
          </p>
        </motion.div>
      </div>
    </div>
  )
}