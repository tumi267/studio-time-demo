'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function StudioHistoryAdmin() {
  const [content, setContent] = useState({
    title: "Studio History",
    paragraphs: [
      "Founded in 2010, our studio began as a passion project between three audio engineers who wanted to create a space that balanced technical excellence with creative freedom.",
      "Over the past decade, we've grown from a small project studio to a world-class facility, working with Grammy-winning artists and major labels while maintaining our indie spirit.",
      "Our recent renovation in 2022 added state-of-the-art acoustics while preserving the vintage character that makes our space unique."
    ]
  })
  const [image, setImage] = useState("/about/studio-history.jpg")
  const [editStates, setEditStates] = useState({
    title: false,
    paragraphs: [false, false, false],
    image: false
  })

  const titleRef = useRef(null)
  const paragraphRefs = useRef([])
  const imageRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editStates.title && titleRef.current && !titleRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, title: false }))
      }

      editStates.paragraphs.forEach((isEditing, index) => {
        if (isEditing && paragraphRefs.current[index] && !paragraphRefs.current[index].contains(event.target)) {
          const newEditStates = { ...editStates }
          newEditStates.paragraphs[index] = false
          setEditStates(newEditStates)
        }
      })

      if (editStates.image && imageRef.current && !imageRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, image: false }))
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
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const updateParagraph = (index, value) => {
    const newParagraphs = [...content.paragraphs]
    newParagraphs[index] = value
    setContent({ ...content, paragraphs: newParagraphs })
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        {/* Title Editor */}
        <div className="mb-6">
          {editStates.title ? (
            <div ref={titleRef} className="flex items-center gap-2">
              <input
                className="text-3xl font-bold bg-white text-black p-2 rounded w-full"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                autoFocus
              />
              <Button
                className="bg-white text-black hover:bg-gray-100"
                onClick={() => setEditStates({ ...editStates, title: false })}
              >
                Save
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 
                className="text-3xl font-bold cursor-pointer"
                onClick={() => setEditStates({ ...editStates, title: true })}
              >
                {content.title}
              </h2>
              <Button
                className="bg-white text-black hover:bg-gray-100"
                onClick={() => setEditStates({ ...editStates, title: true })}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Paragraphs Editor */}
        <div className="space-y-4 text-studio-200">
          {content.paragraphs.map((paragraph, index) => (
            <div key={index}>
              {editStates.paragraphs[index] ? (
                <div ref={el => paragraphRefs.current[index] = el} className="flex flex-col gap-2">
                  <textarea
                    className="bg-white text-black p-2 rounded w-full min-h-[100px]"
                    value={paragraph}
                    onChange={(e) => updateParagraph(index, e.target.value)}
                    autoFocus
                  />
                  <Button
                    className="bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.paragraphs[index] = false
                      setEditStates(newEditStates)
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p 
                    className="cursor-pointer"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.paragraphs[index] = true
                      setEditStates(newEditStates)
                    }}
                  >
                    {paragraph}
                  </p>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 mt-2 self-start"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.paragraphs[index] = true
                      setEditStates(newEditStates)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Image Editor */}
      <div className="relative h-80 lg:h-full rounded-xl overflow-hidden" ref={imageRef}>
        <Image
          src={image}
          alt="Studio in early days"
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          {editStates.image ? (
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
                onClick={() => setEditStates({ ...editStates, image: false })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setEditStates({ ...editStates, image: true })}
              className="bg-white text-black hover:bg-gray-100 shadow-md"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
