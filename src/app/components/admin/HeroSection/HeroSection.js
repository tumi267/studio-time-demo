'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSectionAdmin() {
    const [heroTitle, setHeroTitle] = useState('World-Class Recording Studio')
    const [herotext, setherotext] = useState('Professional recording environment with state-of-the-art equipment and acoustically treated spaces for perfect sound.')
    const [heroTitleIsEdit, setheroTitleIsEdit] = useState(false)
    const [heroTextIsEdit, setHeroTextIsEdit] = useState(false)
    const [bgImage, setBgImage] = useState(
        'https://images.unsplash.com/photo-1620456175552-c82581ade74e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fG11c2ljJTIwZXF1aXBtZW50fGVufDB8fDB8fHww'
    )
    const [editBgImage, setEditBgImage] = useState(false)

    // Create refs for editable elements
    const titleRef = useRef(null)
    const textRef = useRef(null)
    const bgImageRef = useRef(null)

    // Handle clicks outside editable elements
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (heroTitleIsEdit && titleRef.current && !titleRef.current.contains(event.target)) {
                setheroTitleIsEdit(false)
            }
            if (heroTextIsEdit && textRef.current && !textRef.current.contains(event.target)) {
                setHeroTextIsEdit(false)
            }
            if (editBgImage && bgImageRef.current && !bgImageRef.current.contains(event.target)) {
                setEditBgImage(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [heroTitleIsEdit, heroTextIsEdit, editBgImage])

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

    const handleImageEditClick = (e) => {
        e.stopPropagation()
        setEditBgImage(true)
    }

    const handleImageSave = (e) => {
        e.stopPropagation()
        setEditBgImage(false)
    }

    return (
        <div className="relative h-screen">
            {/* Background Image with Edit Controls */}
            <div className="absolute inset-0">
                <Image
                    src={bgImage}
                    alt="Professional recording studio"
                    fill
                    
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                
                {/* Background Image Editor */}
                <div className="absolute top-10 right-10 z-50" ref={bgImageRef}>
                    {editBgImage ? (
                         <div 
                         className="flex flex-col items-center gap-3 bg-white p-4 rounded-lg shadow-lg"
                         onClick={(e) => e.stopPropagation()}
                       >
                         <label className="
                           cursor-pointer 
                           bg-gray-100 hover:bg-gray-200 
                           px-4 py-2 
                           rounded-md 
                           text-base font-medium
                           transition-colors
                           w-full text-center
                         ">
                           Choose New Image
                           <input
                             type="file"
                             accept="image/*"
                             onChange={handleImageChange}
                             className="hidden"
                           />
                         </label>
                         <Button 
                           onClick={handleImageSave}
                           className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                         >
                           Save Changes
                         </Button>
                       </div>
                    ) : (
                        <Button 
                            onClick={handleImageEditClick}
                            className="bg-white text-black hover:bg-gray-100 shadow-md"
                        >
                            Edit
                        </Button>
                    )}
                </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl text-white"
                >
                    {/* Title Section */}
                    <div className="relative">
                        {heroTitleIsEdit ? (
                            <input
                                ref={titleRef}
                                className="text-black bg-white p-2 rounded-md text-5xl md:text-7xl font-bold w-full max-w-[768px]"
                                type="text"
                                value={heroTitle} 
                                onChange={(e) => setHeroTitle(e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                {heroTitle}
                            </h1>
                        )}
                        <Button 
                            className="relative bottom-0 right-0 bg-white text-black hover:bg-gray-100" 
                            onClick={() => heroTitleIsEdit ? setheroTitleIsEdit(false) : setheroTitleIsEdit(true)}
                        >
                            {heroTitleIsEdit ? 'Save' : 'Edit'}
                        </Button>
                    </div>
    
                    {/* Description Section */}
                    <div className="relative mb-8 mt-[2em]">
                        {heroTextIsEdit ? (
                            <textarea 
                                ref={textRef}
                                className="text-black bg-white p-2 rounded-md text-xl md:text-2xl w-full max-w-[768px] h-32 resize-y"
                                value={herotext} 
                                onChange={(e) => setherotext(e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <p className="text-xl md:text-2xl">
                                {herotext}
                            </p>
                        )}
                        <Button 
                            className="relative bottom-0 right-0 bg-white text-black hover:bg-gray-100" 
                            onClick={() => heroTextIsEdit ? setHeroTextIsEdit(false) : setHeroTextIsEdit(true)}
                        >
                            {heroTextIsEdit ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                    
                    {/* Booking Button */}
                    <Link 
                        href={'/booking'} 
                        className="inline-block bg-studio-300 hover:bg-studio-400 text-studio-900 font-bold py-3 px-8 rounded-full text-lg transition-colors"
                    >
                        Book a Session
                    </Link>
                </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </div>
        </div>
    )
}