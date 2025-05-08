'use client'
import { useState } from 'react'
import GalleryGrid from '../components/gallery/GalleryGrid.js'
import GalleryModal from '../components/gallery/GalleryModal.js'
import { galleryImages } from '../data/galleryImages.js'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeModal = () => setSelectedImage(null)

  const navigate = (direction) => {
    let newIndex
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    } else {
      newIndex = (currentIndex + 1) % galleryImages.length
    }
    setSelectedImage(galleryImages[newIndex])
    setCurrentIndex(newIndex)
  }

  return (
    <div className="min-h-screen bg-studio-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-16 text-studio-100">
          Studio Gallery
        </h1>
        
        <GalleryGrid images={galleryImages} onImageClick={openModal} />
        
        {selectedImage && (
          <GalleryModal 
            image={selectedImage} 
            onClose={closeModal}
            onPrev={() => navigate('prev')}
            onNext={() => navigate('next')}
          />
        )}
      </div>
    </div>
  )
}