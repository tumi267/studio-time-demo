'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutHero() {
  return (
    <div className="relative h-[60vh] min-h-[500px]">
      <Image
        src="/about/studio-exterior.jpg"
        alt="Our Studio"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-studio-300">Story</span>
          </h1>
          <p className="text-xl md:text-2xl">
            Dedicated to creating the perfect environment for artists to bring their vision to life
          </p>
        </motion.div>
      </div>
    </div>
  )
}