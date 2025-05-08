// components/ParallaxSection.jsx
'use client'

import React from 'react'

export default function ParallaxSection({ imageUrl, title, description }) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden ">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 parallax-bg"
        style={{ backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: 'fixed' }
    }
      />
      <div className="relative z-10 text-center p-8 bg-black bg-opacity-50 text-white max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl">{description}</p>
      </div>
    </div>
  )
}