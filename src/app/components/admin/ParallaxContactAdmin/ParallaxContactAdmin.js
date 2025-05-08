'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function ParallaxSection({ imageUrl, title, description }) {
  const [currentImage, setCurrentImage] = useState(imageUrl)
  const [editImage, setEditImage] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editImage && imageRef.current && !imageRef.current.contains(e.target)) {
        setEditImage(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editImage])

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image under 5MB.")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div >
      {/* Background Image with proper aspect ratio */}
      <div className="absolute inset-0">
        <Image
          src={currentImage}
          alt="Background"
          fill
   
          priority
        />
      </div>

      {/* Edit Image Button */}
      <div className="absolute top-4 right-4 z-20" ref={imageRef}>
        {editImage ? (
          <div className="flex gap-2 bg-white p-2 rounded-md">
            <Input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
            />
            <Button 
              variant="secondary" 
              onClick={() => setEditImage(false)}
            >
              Save
            </Button>
          </div>
        ) : (
          <Button
            variant="secondary"
            onClick={() => setEditImage(true)}
          >
            Edit Image
          </Button>
        )}
      </div>

      {/* Optional: Add your title and description content here */}
    </div>
  )
}