'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'

function LangingGalleryAdmin() {
  const initialImages = [
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1618609377864-68609b857e90?w=500&auto=format&fit=crop&q=60',
    'https://plus.unsplash.com/premium_photo-1680955436131-52b6d11cf6b8?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1613870948964-7125fa3e1aab?w=500&auto=format&fit=crop&q=60',
    'https://plus.unsplash.com/premium_photo-1683115179796-aaf64e354441?w=500&auto=format&fit=crop&q=60',
    'https://plus.unsplash.com/premium_photo-1664194584256-5c940e4e7ecf?w=500&auto=format&fit=crop&q=60',
    'https://plus.unsplash.com/premium_photo-1682940443809-a214f034dca1?w=500&auto=format&fit=crop&q=60'
  ]

  const [imageList, setImageList] = useState(initialImages)
  const inputRefs = useRef([])
  const [isEditingText, setIsEditingText] = useState(false)
  const [textValue, setTextValue] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed est massa. Quisque gravida volutpat enim id pellentesque.'
  )

  const textAreaRef = useRef(null)

  const handleImageClick = (index) => {
    inputRefs.current[index]?.click()
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 16 * 1024 * 1024) {
        alert('Image must be smaller than 16MB.')
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedImages = [...imageList]
        updatedImages[index] = reader.result
        setImageList(updatedImages)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditClick = () => {
    setIsEditingText(true)
    setTimeout(() => {
      textAreaRef.current?.focus()
    }, 100)
  }

  const handleSaveText = () => {
    setIsEditingText(false)
  }

  const handleBlurText = () => {
    setIsEditingText(false)
  }

  return (
    <div className='px-[5em] py-12'>
      <h3>click image to change</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 h-[80vh] items-center'>
        <div className='text-center md:text-left'>
          {isEditingText ? (
            <div className="relative">
              <textarea
                ref={textAreaRef}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onBlur={handleBlurText}
                className="w-full h-40 p-3 border border-gray-300 rounded-md resize-none"
              />
              <button
                onClick={handleSaveText}
                className="absolute bottom-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded"
              >
                save
              </button>
            </div>
          ) : (
            <div>
              <h3 className="font-Inter text-[#2b2b2b] font-[600] max-w-[600px] mx-auto md:mx-0">
                {textValue}
              </h3>
              <button
                onClick={handleEditClick}
                className="mt-3 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 h-full'>
          {imageList.map((src, i) => (
            <div 
              key={i} 
              className='relative h-full w-full overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer'
              onClick={() => handleImageClick(i)}
            >
              <Image 
                src={src} 
                alt={`Image ${i}`} 
                fill 
                className='object-cover' 
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={el => inputRefs.current[i] = el}
                onChange={(e) => handleImageChange(e, i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LangingGalleryAdmin
