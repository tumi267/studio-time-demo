'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { galleryImages } from '../../../data/galleryImages'
const imageSizes = [
  'col-span-2 row-span-2', // Big square
  'col-span-1 row-span-1', // Small square
  'col-span-2 row-span-1', // Wide rectangle
  'col-span-1 row-span-2', // Tall rectangle
]

export default function GalleryGridAdmin() {
  const [images, setImages] = useState(galleryImages)
  const [editMode, setEditMode] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const newImage = {
          id: Date.now() + Math.random(),
          src: reader.result,
          alt: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        }
        setImages(prev => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const handleDragStart = (e, index) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.currentTarget)
  }

  const handleDragOver = (index) => {
    if (draggedItem === null || draggedItem === index) return
    
    setImages(prev => {
      const newItems = [...prev]
      newItems.splice(index, 0, newItems.splice(draggedItem, 1)[0])
      return newItems
    })
    
    setDraggedItem(index)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    if (onImagesChange) onImagesChange(images)
  }

  const handleImageClick = (image, index) => {
    if (!editMode) {
      // Your existing click handler logic here
      console.log('Image clicked:', image, index)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <div className="flex gap-2">
          <Button
            variant={editMode ? 'default' : 'outline'}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Done Editing' : 'Edit Gallery'}
          </Button>
          
          {editMode && (
            <Button asChild variant="secondary">
              <label>
                <Plus className="h-4 w-4 mr-2" /> Add Images
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleAddImage} 
                  className="hidden" 
                />
              </label>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {images.map((image, index) => {
          const sizeClass = imageSizes[index % imageSizes.length]
          return (
            <motion.div
              key={image.id}
              layout
              drag={editMode}
              onDragStart={(e) => editMode && handleDragStart(e, index)}
              onDragOver={() => editMode && handleDragOver(index)}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 0.98 }}
              whileTap={editMode ? { scale: 0.95 } : {}}
              className={`relative rounded-xl overflow-hidden cursor-pointer ${sizeClass} ${
                editMode ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
              onClick={() => handleImageClick(image, index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
              
              {editMode && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 p-1 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage(image.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}