'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ParallaxSection({ imageUrl, title, description }) {
  const [currentImage, setCurrentImage] = useState(imageUrl)
  const [currentTitle, setCurrentTitle] = useState(title)
  const [currentDescription, setCurrentDescription] = useState(description)

  const [editImage, setEditImage] = useState(false)
  const [editTitle, setEditTitle] = useState(false)
  const [editDescription, setEditDescription] = useState(false)

  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editImage && imageRef.current && !imageRef.current.contains(e.target)) {
        setEditImage(false)
      }
      if (editTitle && titleRef.current && !titleRef.current.contains(e.target)) {
        setEditTitle(false)
      }
      if (editDescription && descRef.current && !descRef.current.contains(e.target)) {
        setEditDescription(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editImage, editTitle, editDescription])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 parallax-bg"
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Edit Image Button */}
      <div className="absolute top-4 right-4 z-20" ref={imageRef}>
        {editImage ? (
          <div className="flex gap-2">
            <Input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file && file.size < 5 * 1024 * 1024) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setCurrentImage(reader.result)
                  }
                  reader.readAsDataURL(file)
                } else {
                  alert("Please select a JPEG or PNG image under 5MB.")
                }
              }}
            />
            <Button variant="secondary" onClick={() => setEditImage(false)}>Save</Button>
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

      {/* Content Block */}
      <div className="relative z-10 text-center p-8 bg-black bg-opacity-50 text-white max-w-4xl mx-auto space-y-6">

        {/* Title */}
        <div className="flex items-center justify-center gap-2" ref={titleRef}>
          {editTitle ? (
            <>
              <Input
                className="text-4xl font-bold text-center"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />
              <Button onClick={() => setEditTitle(false)}>Save</Button>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4">{currentTitle}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditTitle(true)}
                className="text-sm"
              >
                Edit
              </Button>
            </>
          )}
        </div>

        {/* Description */}
        <div className="flex items-center justify-center gap-2" ref={descRef}>
          {editDescription ? (
            <>
              <Textarea
                className="text-xl text-center"
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
              />
              <Button onClick={() => setEditDescription(false)}>Save</Button>
            </>
          ) : (
            <>
              <p className="text-xl">{currentDescription}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditDescription(true)}
                className="text-sm"
              >
                Edit
              </Button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
