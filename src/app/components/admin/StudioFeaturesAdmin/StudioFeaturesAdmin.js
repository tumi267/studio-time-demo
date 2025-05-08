'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

const defaultFeatures = [
  {
    id: 1,
    icon: '🎛️',
    title: "Analog & Digital",
    description: "Hybrid setup with vintage outboard gear and modern digital workflow"
  },
  {
    id: 2,
    icon: '🎚️',
    title: "Control Room",
    description: "Acoustically treated control room with premium monitoring"
  },
  {
    id: 3,
    icon: '🎤',
    title: "Live Room",
    description: "Spacious live room with variable acoustics for any ensemble"
  },
  {
    id: 4,
    icon: '🎧',
    title: "Isolation Booths",
    description: "Dedicated vocal/instrument booths for clean recordings"
  }
]

export default function StudioFeatures() {
  const [features, setFeatures] = useState(defaultFeatures)
  const [sectionTitle, setSectionTitle] = useState("Studio Features")
  const [editStates, setEditStates] = useState({
    sectionTitle: false,
    features: defaultFeatures.reduce((acc, _, index) => {
      acc[index] = { icon: false, title: false, description: false }
      return acc
    }, {})
  })

  const sectionTitleRef = useRef(null)
  const featureRefs = useRef({})

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editStates.sectionTitle && sectionTitleRef.current && !sectionTitleRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, sectionTitle: false }))
      }

      Object.entries(editStates.features).forEach(([index, fields]) => {
        Object.entries(fields).forEach(([field, isEditing]) => {
          if (isEditing && featureRefs.current[index] && featureRefs.current[index][field] && 
              !featureRefs.current[index][field].contains(event.target)) {
            const newEditStates = { ...editStates }
            newEditStates.features[index][field] = false
            setEditStates(newEditStates)
          }
        })
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editStates])

  const addFeature = () => {
    const newId = features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1
    const newFeature = {
      id: newId,
      icon: '⭐',
      title: "New Feature",
      description: "Feature description here"
    }
    
    setFeatures([...features, newFeature])
    
    const newEditStates = { ...editStates }
    newEditStates.features[features.length] = { icon: true, title: false, description: false }
    setEditStates(newEditStates)
  }

  const deleteFeature = (id) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  const updateFeature = (id, field, value) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ))
  }

  return (
    <section className="py-16 relative group">
      <div className="flex justify-between items-center mb-12">
        {editStates.sectionTitle ? (
          <div ref={sectionTitleRef} className="flex items-center gap-2">
            <input
              className="text-3xl font-bold bg-white text-black p-2 rounded"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              autoFocus
            />
            <Button
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => setEditStates({ ...editStates, sectionTitle: false })}
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 
              className="text-3xl font-bold cursor-pointer"
              onClick={() => setEditStates({ ...editStates, sectionTitle: true })}
            >
              {sectionTitle}
            </h2>
            <Button
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => setEditStates({ ...editStates, sectionTitle: true })}
            >
              Edit
            </Button>
          </div>
        )}
        
        <Button 
          onClick={addFeature}
          className="bg-white text-black hover:bg-gray-100 flex items-center gap-2"
        >
          <Plus size={16} /> Add Feature
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={feature.id} className="bg-studio-800 p-6 rounded-lg hover:bg-studio-700 transition-colors relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={() => deleteFeature(feature.id)}
            >
              <Trash2 size={16} />
            </Button>

            <div className="mb-4">
              {editStates.features[index]?.icon ? (
                <div ref={el => {
                  if (!featureRefs.current[index]) featureRefs.current[index] = {}
                  featureRefs.current[index].icon = el
                }}>
                  <input
                    className="text-4xl bg-white text-black p-1 rounded w-full"
                    value={feature.icon}
                    onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                    autoFocus
                  />
                  <Button
                    className="mt-2 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].icon = false
                      setEditStates(newEditStates)
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div>
                  <div 
                    className="text-4xl cursor-pointer"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].icon = true
                      setEditStates(newEditStates)
                    }}
                  >
                    {feature.icon}
                  </div>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 mt-2"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].icon = true
                      setEditStates(newEditStates)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>

            <div className="mb-2">
              {editStates.features[index]?.title ? (
                <div ref={el => {
                  if (!featureRefs.current[index]) featureRefs.current[index] = {}
                  featureRefs.current[index].title = el
                }}>
                  <input
                    className="text-xl font-semibold bg-white text-black p-2 rounded w-full"
                    value={feature.title}
                    onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                    autoFocus
                  />
                  <Button
                    className="mt-2 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].title = false
                      setEditStates(newEditStates)
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].title = true
                      setEditStates(newEditStates)
                    }}
                  >
                    {feature.title}
                  </h3>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 mt-2"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].title = true
                      setEditStates(newEditStates)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>

            <div>
              {editStates.features[index]?.description ? (
                <div ref={el => {
                  if (!featureRefs.current[index]) featureRefs.current[index] = {}
                  featureRefs.current[index].description = el
                }}>
                  <textarea
                    className="text-studio-200 bg-white text-black p-2 rounded w-full h-24"
                    value={feature.description}
                    onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                    autoFocus
                  />
                  <Button
                    className="mt-2 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].description = false
                      setEditStates(newEditStates)
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div>
                  <p 
                    className="text-studio-200 cursor-pointer"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].description = true
                      setEditStates(newEditStates)
                    }}
                  >
                    {feature.description}
                  </p>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 mt-2"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.features[index].description = true
                      setEditStates(newEditStates)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}