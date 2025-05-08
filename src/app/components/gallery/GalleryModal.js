'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function GalleryModal({ image, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-lg"
          onClick={onClose}
        />
        
        {/* Modal Content - Centered Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-studio-800/50 hover:bg-studio-700/80 rounded-full p-3 z-20"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-studio-800/50 hover:bg-studio-700/80 rounded-full p-3 z-20"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-studio-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Centered Image Container */}
          <div className="flex justify-center w-full">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative rounded-xl overflow-hidden"
              style={{
                height: 'min(60vh, 800px)',
                width: 'min(90vw, 1200px)',
                aspectRatio: '16/9'
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
              />
            </motion.div>
          </div>
          
          {/* Centered Caption */}
          <div className="mt-4 text-center text-white w-full max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold">{image.title}</h3>
            <p className="text-studio-200">{image.description}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}