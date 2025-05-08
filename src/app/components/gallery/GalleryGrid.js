'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const imageSizes = [
  'col-span-2 row-span-2', // Big square
  'col-span-1 row-span-1', // Small square
  'col-span-2 row-span-1', // Wide rectangle
  'col-span-1 row-span-2', // Tall rectangle
]

export default function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[200px]">
      {images.map((image, index) => {
        const sizeClass = imageSizes[index % imageSizes.length]
        return (
          <motion.div
            key={image.id}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${sizeClass}`}
            whileHover={{ scale: 0.98 }}
            onClick={() => onImageClick(image, index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
          </motion.div>
        )
      })}
    </div>
  )
}