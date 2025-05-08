'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

const defaultValues = [
  {
    id: 1,
    title: "Quality First",
    description: "We never compromise on sound quality, using only the best equipment and techniques",
    icon: "🎚️" 
  },
  {
    id: 2,
    title: "Artist Focused",
    description: "Your creative vision drives every technical decision we make",
    icon: "🎤"
  },
  {
    id: 3,
    title: "Innovation",
    description: "We continuously explore new technologies to enhance your sound",
    icon: "✨"
  }
]

export default function ValuesSectionAdmin() {
  const [values, setValues] = useState(defaultValues)
  const [sectionTitle, setSectionTitle] = useState("Our Values")
  const [editStates, setEditStates] = useState({
    sectionTitle: false,
    values: defaultValues.reduce((acc, value) => {
      acc[value.id] = { title: false, description: false, icon: false }
      return acc
    }, {})
  })

  const sectionTitleRef = useRef(null)
  const valueRefs = useRef({})

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editStates.sectionTitle && sectionTitleRef.current && !sectionTitleRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, sectionTitle: false }))
      }

      Object.entries(editStates.values).forEach(([id, valueState]) => {
        Object.entries(valueState).forEach(([field, isEditing]) => {
          if (isEditing && valueRefs.current[id]?.[field] && !valueRefs.current[id][field].contains(event.target)) {
            const newEditStates = { ...editStates }
            newEditStates.values[id][field] = false
            setEditStates(newEditStates)
          }
        })
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editStates])

  const addValue = () => {
    const newId = values.length > 0 ? Math.max(...values.map(v => v.id)) + 1 : 1
    const newValue = {
      id: newId,
      title: "New Value",
      description: "Value description here",
      icon: "⭐"
    }
    
    setValues([...values, newValue])
    
    const newEditStates = { ...editStates }
    newEditStates.values[newId] = { title: true, description: false, icon: false }
    setEditStates(newEditStates)
  }

  const deleteValue = (id) => {
    setValues(values.filter(v => v.id !== id))
  }

  const updateValue = (id, field, value) => {
    setValues(values.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ))
  }

  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-12">
        {editStates.sectionTitle ? (
          <div ref={sectionTitleRef} className="flex items-center gap-2 mx-auto">
            <input
              className="text-3xl font-bold bg-white text-black p-2 rounded text-center"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              autoFocus
            />
            <Button
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => setEditStates(prev => ({ ...prev, sectionTitle: false }))}
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 mx-auto">
            <h2 
              className="text-3xl font-bold cursor-pointer"
              onClick={() => setEditStates(prev => ({ ...prev, sectionTitle: true }))}
            >
              {sectionTitle}
            </h2>
            <Button
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => setEditStates(prev => ({ ...prev, sectionTitle: true }))}
            >
              Edit
            </Button>
          </div>
        )}
        
        <Button 
          onClick={addValue}
          className="bg-white text-black hover:bg-gray-100 flex items-center gap-2"
        >
          <Plus size={16} /> Add Value
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value) => (
          <div key={value.id} className="bg-studio-900 p-8 rounded-xl relative">
            {/* Delete Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={() => deleteValue(value.id)}
            >
              <Trash2 size={16} />
            </Button>

            {/* Icon Editor */}
            <div className="mb-4">
              {editStates.values[value.id]?.icon ? (
                <div ref={el => {
                  if (!valueRefs.current[value.id]) valueRefs.current[value.id] = {}
                  valueRefs.current[value.id].icon = el
                }}>
                  <input
                    className="text-4xl bg-white text-black p-1 rounded w-full"
                    value={value.icon}
                    onChange={(e) => updateValue(value.id, 'icon', e.target.value)}
                    autoFocus
                  />
                  <Button
                    className="mt-2 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.values[value.id].icon = false
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
                      newEditStates.values[value.id].icon = true
                      setEditStates(newEditStates)
                    }}
                  >
                    {value.icon}
                  </div>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 mt-2"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.values[value.id].icon = true
                      setEditStates(newEditStates)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>

            {/* Title Editor */}
            <div className="mb-2">
              {editStates.values[value.id]?.title ? (
                <div ref={el => {
                  if (!valueRefs.current[value.id]) valueRefs.current[value.id] = {}
                  valueRefs.current[value.id].title = el
                }}>
                  <input
                    className="text-xl font-bold bg-white text-black p-2 rounded w-full"
                    value={value.title}
                    onChange={(e) => updateValue(value.id, 'title', e.target.value)}
                    autoFocus
                  />
                  <Button
                    className="mt-2 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.values[value.id].title = false
                      setEditStates(newEditStates)
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.values[value.id].title = true
                      setEditStates(newEditStates)
                    }}
                  >
                    {value.title}
                  </h3>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 mt-2"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.values[value.id].title = true
                      setEditStates(newEditStates)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>

            {/* Description Editor */}
            <div>
              {editStates.values[value.id]?.description ? (
                <div ref={el => {
                  if (!valueRefs.current[value.id]) valueRefs.current[value.id] = {}
                  valueRefs.current[value.id].description = el
                }}>
                  <textarea
                    className="text-studio-200 bg-white text-black p-2 rounded w-full min-h-[100px]"
                    value={value.description}
                    onChange={(e) => updateValue(value.id, 'description', e.target.value)}
                    autoFocus
                  />
                  <Button
                    className="mt-2 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.values[value.id].description = false
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
                      newEditStates.values[value.id].description = true
                      setEditStates(newEditStates)
                    }}
                  >
                    {value.description}
                  </p>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 mt-2"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.values[value.id].description = true
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