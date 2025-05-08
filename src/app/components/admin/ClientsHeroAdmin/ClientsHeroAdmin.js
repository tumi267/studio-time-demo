'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Paintbrush } from 'lucide-react'

export default function ClientsHeroAdmin() {
  const [heroContent, setHeroContent] = useState({
    imageUrl: "https://images.unsplash.com/photo-1708192279059-a19f22e16ef1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvbnklMjBNdXNpY3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Our Clients",
    description: "We've had the privilege of working with some of the best in the industry",
    overlayColor: 'black', // 'black', 'white', or 'gray'
    textColor: 'white' // 'white', 'black', or 'gray'
  })

  const [editImage, setEditImage] = useState(false)
  const [editTitle, setEditTitle] = useState(false)
  const [editDescription, setEditDescription] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const colorPickerRef = useRef(null)

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
      if (showColorPicker && colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editImage, editTitle, editDescription, showColorPicker])

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroContent({...heroContent, imageUrl: reader.result})
      }
      reader.readAsDataURL(file)
    }
  }

  const getOverlayClass = () => {
    switch(heroContent.overlayColor) {
      case 'white': return 'bg-white/50'
      case 'gray': return 'bg-gray-500/50'
      default: return 'bg-black/50'
    }
  }

  const getTextColorClass = () => {
    switch(heroContent.textColor) {
      case 'black': return 'text-black'
      case 'gray': return 'text-gray-700'
      default: return 'text-white'
    }
  }

  const handleColorChange = (type, color) => {
    setHeroContent({...heroContent, [type]: color})
    setShowColorPicker(false)
  }

  return (
    <div className="relative h-64 md:h-96">
      {/* Background Image with Edit Button */}
      <div ref={imageRef} className="relative h-full w-full">
        <Image
          src={heroContent.imageUrl}
          alt="Our Clients"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {editImage ? (
            <div className="flex gap-2 bg-white p-2 rounded">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="max-w-[180px]"
              />
              <Button 
                size="sm" 
                onClick={() => setEditImage(false)}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditImage(true)}
            >
              Edit Image
            </Button>
          )}
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <Paintbrush className="h-4 w-4 mr-2" /> Colors
          </Button>
        </div>
      </div>

      {/* Color Picker Popover */}
      {showColorPicker && (
        <div 
          ref={colorPickerRef}
          className="absolute top-16 right-4 z-20 bg-white p-4 rounded shadow-lg"
        >
          <h4 className="font-medium mb-2">Overlay Color</h4>
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => handleColorChange('overlayColor', 'black')}
              className={`h-8 w-8 rounded-full bg-black ${heroContent.overlayColor === 'black' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            />
            <button 
              onClick={() => handleColorChange('overlayColor', 'white')}
              className={`h-8 w-8 rounded-full bg-white ${heroContent.overlayColor === 'white' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            />
            <button 
              onClick={() => handleColorChange('overlayColor', 'gray')}
              className={`h-8 w-8 rounded-full bg-gray-500 ${heroContent.overlayColor === 'gray' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            />
          </div>
          
          <h4 className="font-medium mb-2">Text Color</h4>
          <div className="flex gap-2">
            <button 
              onClick={() => handleColorChange('textColor', 'white')}
              className={`h-8 w-8 rounded-full bg-white border border-gray-300 flex items-center justify-center ${heroContent.textColor === 'white' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            >
              <span className="text-black text-xs">A</span>
            </button>
            <button 
              onClick={() => handleColorChange('textColor', 'black')}
              className={`h-8 w-8 rounded-full bg-black flex items-center justify-center ${heroContent.textColor === 'black' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            >
              <span className="text-white text-xs">A</span>
            </button>
            <button 
              onClick={() => handleColorChange('textColor', 'gray')}
              className={`h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center ${heroContent.textColor === 'gray' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            >
              <span className="text-white text-xs">A</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay Content */}
      <div className={`absolute inset-0 ${getOverlayClass()} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-center px-4 ${getTextColorClass()}`}
        >
          {/* Title with Edit */}
          <div ref={titleRef} className="mb-4">
            {editTitle ? (
              <div className="flex items-center justify-center gap-2">
                <Input
                  className={`text-4xl md:text-6xl font-bold text-center bg-transparent ${heroContent.textColor === 'white' ? 'border-white' : 'border-gray-700'} border`}
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                />
                <Button 
                  size="sm"
                  onClick={() => setEditTitle(false)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-4xl md:text-6xl font-bold">{heroContent.title}</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  className={heroContent.textColor === 'white' ? 'text-white hover:text-white' : 'text-current hover:text-current'}
                  onClick={() => setEditTitle(true)}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>

          {/* Description with Edit */}
          <div ref={descRef} className="max-w-2xl mx-auto">
            {editDescription ? (
              <div className="flex items-center justify-center gap-2">
                <Input
                  className={`text-xl md:text-2xl text-center bg-transparent ${heroContent.textColor === 'white' ? 'border-white' : 'border-gray-700'} border`}
                  value={heroContent.description}
                  onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                />
                <Button 
                  size="sm"
                  onClick={() => setEditDescription(false)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl md:text-2xl">{heroContent.description}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className={heroContent.textColor === 'white' ? 'text-white hover:text-white' : 'text-current hover:text-current'}
                  onClick={() => setEditDescription(true)}
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