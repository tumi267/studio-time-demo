'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutHero() {
  const [bgImage, setBgImage] = useState("/about/studio-exterior.jpg")
  const [title, setTitle] = useState("Our Story")
  const [description, setDescription] = useState(
    "Dedicated to creating the perfect environment for artists to bring their vision to life"
  )
  const [textColor, setTextColor] = useState("text-white") // Default to white
  const [editStates, setEditStates] = useState({
    bgImage: false,
    title: false,
    description: false,
    color: false
  })

  const bgImageRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editStates.bgImage && bgImageRef.current && !bgImageRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, bgImage: false }))
      }
      if (editStates.title && titleRef.current && !titleRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, title: false }))
      }
      if (editStates.description && descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, description: false }))
      }
      if (editStates.color && !event.target.closest('.color-options')) {
        setEditStates(prev => ({ ...prev, color: false }))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editStates])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBgImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative h-[60vh] min-h-[500px]">
      <Image
        src={bgImage}
        alt="Our Studio"
        fill
        className="object-cover"
        priority
      />
      
      {/* Background Image Editor */}
      <div className="absolute top-4 right-4 z-10" ref={bgImageRef}>
        {editStates.bgImage ? (
          <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-lg shadow-lg">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-base font-medium transition-colors w-full text-center">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <Button 
              onClick={() => setEditStates(prev => ({ ...prev, bgImage: false }))}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => setEditStates(prev => ({ ...prev, bgImage: true }))}
            className="bg-white text-black hover:bg-gray-100 shadow-md"
          >
            Edit
          </Button>
        )}
      </div>

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center px-6 max-w-4xl mx-auto ${textColor}`}
        >
          {/* Text Color Selector */}
          <div className="absolute top-4 left-4 z-10">
            {editStates.color ? (
              <div className="color-options bg-white p-2 rounded-lg shadow-lg flex gap-2">
                <Button 
                  className={`bg-black text-white ${textColor === 'text-black' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => setTextColor('text-black')}
                >
                  Black
                </Button>
                <Button 
                  className={`bg-white text-black ${textColor === 'text-white' ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setTextColor('text-white')}
                >
                  White
                </Button>
                <Button 
                  className={`bg-gray-500 text-white ${textColor === 'text-gray-300' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => setTextColor('text-gray-300')}
                >
                  Gray
                </Button>
                <Button 
                  className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setEditStates(prev => ({ ...prev, color: false }))}
                >
                  ✓
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setEditStates(prev => ({ ...prev, color: true }))}
                className="bg-white text-black hover:bg-gray-100 shadow-md"
              >
                Color
              </Button>
            )}
          </div>

          {/* Title Editor */}
          <div className="mb-6">
            {editStates.title ? (
              <div ref={titleRef} className="flex flex-col items-center gap-2">
                <input
                  className="text-4xl md:text-6xl font-bold bg-white text-black p-2 rounded text-center w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
                <Button
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={() => setEditStates(prev => ({ ...prev, title: false }))}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h1 
                  className="text-4xl md:text-6xl font-bold cursor-pointer"
                  onClick={() => setEditStates(prev => ({ ...prev, title: true }))}
                >
                  {title}
                </h1>
                <Button
                  className="bg-white text-black hover:bg-gray-100 mt-2"
                  onClick={() => setEditStates(prev => ({ ...prev, title: true }))}
                >
                  Edit Title
                </Button>
              </div>
            )}
          </div>

          {/* Description Editor */}
          <div ref={descriptionRef}>
            {editStates.description ? (
              <div className="flex flex-col items-center gap-2">
                <textarea
                  className="text-xl md:text-2xl bg-white text-black p-2 rounded text-center w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoFocus
                />
                <Button
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={() => setEditStates(prev => ({ ...prev, description: false }))}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p 
                  className="text-xl md:text-2xl cursor-pointer"
                  onClick={() => setEditStates(prev => ({ ...prev, description: true }))}
                >
                  {description}
                </p>
                <Button
                  className="bg-white text-black hover:bg-gray-100 mt-2"
                  onClick={() => setEditStates(prev => ({ ...prev, description: true }))}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}