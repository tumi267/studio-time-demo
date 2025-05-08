'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

const defaultCategories = [
  {
    id: 1,
    name: "Monitoring",
    items: [
      { id: 1, text: "PMC twotwo.8 (Main Monitors)" },
      { id: 2, text: "ATC SCM25A Pro (Nearfields)" },
      { id: 3, text: "Focal Trio6 Be (3-Way Reference)" },
      { id: 4, text: "Avantone MixCubes (Auratones)" },
      { id: 5, text: "Beyerdynamic DT 1990 Pro (Headphones)" },
      { id: 6, text: "Dangerous Music Monitor ST (Controller)" },
      { id: 7, text: "Trinnov ST2 Pro (Room Correction)" }
    ]
  },
  {
    id: 2,
    name: "Microphones",
    items: [
      { id: 1, text: "Neumann U87 Ai (Tube)" },
      { id: 2, text: "Sony C-800G (Vocal)" },
      { id: 3, text: "Telefunken ELA M 251E (Tube)" },
      { id: 4, text: "Coles 4038 (Ribbon)" },
      { id: 5, text: "Sennheiser MD 441 (Dynamic)" },
      { id: 6, text: "Schoeps MK4 (Stereo Pair)" }
    ]
  },
  {
    id: 3,
    name: "Outboard & Processing",
    items: [
      { id: 1, text: "Neve 1073LB (Preamps)" },
      { id: 2, text: "Universal Audio 1176 (Compressors)" },
      { id: 3, text: "Tube-Tech CL 1B (Optical)" },
      { id: 4, text: "Manley Massive Passive (EQ)" },
      { id: 5, text: "Burl B32 Mothership (Converters)" },
      { id: 6, text: "Antelope Audio Orion 32 (Interface)" }
    ]
  }
]

export default function EquipmentListAdmin() {
  const [categories, setCategories] = useState(defaultCategories)
  const [sectionTitle, setSectionTitle] = useState("Equipment List")
  const [editStates, setEditStates] = useState({
    sectionTitle: false,
    categories: defaultCategories.reduce((acc, _, catIndex) => {
      acc[catIndex] = {
        name: false,
        items: {}
      }
      return acc
    }, {})
  })

  const sectionTitleRef = useRef(null)
  const categoryRefs = useRef({})
  const itemRefs = useRef({})

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editStates.sectionTitle && sectionTitleRef.current && !sectionTitleRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, sectionTitle: false }))
      }

      Object.entries(editStates.categories).forEach(([catIndex, categoryState]) => {
        // Handle category name edits
        if (categoryState.name && categoryRefs.current[catIndex]?.name && 
            !categoryRefs.current[catIndex].name.contains(event.target)) {
          const newEditStates = { ...editStates }
          newEditStates.categories[catIndex].name = false
          setEditStates(newEditStates)
        }

        // Handle item edits
        Object.entries(categoryState.items).forEach(([itemId, isEditing]) => {
          if (isEditing && itemRefs.current[catIndex]?.[itemId] && 
              !itemRefs.current[catIndex][itemId].contains(event.target)) {
            const newEditStates = { ...editStates }
            newEditStates.categories[catIndex].items[itemId] = false
            setEditStates(newEditStates)
          }
        })
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editStates])

  const addCategory = () => {
    const newCatId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1
    const newCategory = {
      id: newCatId,
      name: "New Category",
      items: [{ id: 1, text: "New Equipment Item" }]
    }
    
    setCategories([...categories, newCategory])
    
    const newEditStates = { ...editStates }
    newEditStates.categories[categories.length] = {
      name: true,
      items: { 1: true }
    }
    setEditStates(newEditStates)
  }

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  const addItem = (catId) => {
    const newItemId = categories.find(c => c.id === catId).items.length > 0 ? 
      Math.max(...categories.find(c => c.id === catId).items.map(i => i.id)) + 1 : 1
    const newItem = { id: newItemId, text: "New Equipment Item" }
    
    setCategories(categories.map(c => 
      c.id === catId ? { ...c, items: [...c.items, newItem] } : c
    ))
    
    const catIndex = categories.findIndex(c => c.id === catId)
    const newEditStates = { ...editStates }
    newEditStates.categories[catIndex].items[newItemId] = true
    setEditStates(newEditStates)
  }

  const deleteItem = (catId, itemId) => {
    setCategories(categories.map(c => 
      c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c
    ))
  }

  const updateCategory = (id, field, value) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  const updateItem = (catId, itemId, value) => {
    setCategories(categories.map(c => 
      c.id === catId ? { 
        ...c, 
        items: c.items.map(i => 
          i.id === itemId ? { ...i, text: value } : i
        )
      } : c
    ))
  }

  return (
    <section className="py-16">
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
          onClick={addCategory}
          className="bg-white text-black hover:bg-gray-100 flex items-center gap-2"
        >
          <Plus size={16} /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, catIndex) => (
          <div key={category.id} className="bg-studio-800 p-6 rounded-lg relative">
            {/* Delete Category Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={() => deleteCategory(category.id)}
            >
              <Trash2 size={16} />
            </Button>

            {/* Category Name */}
            <div className="mb-4 border-b border-studio-700 pb-2">
              {editStates.categories[catIndex]?.name ? (
                <div ref={el => {
                  if (!categoryRefs.current[catIndex]) categoryRefs.current[catIndex] = {}
                  categoryRefs.current[catIndex].name = el
                }}>
                  <input
                    className="text-xl font-semibold bg-white text-black p-2 rounded w-full"
                    value={category.name}
                    onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                    autoFocus
                  />
                  <Button
                    className="mt-2 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.categories[catIndex].name = false
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
                      newEditStates.categories[catIndex].name = true
                      setEditStates(newEditStates)
                    }}
                  >
                    {category.name}
                  </h3>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 mt-2"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.categories[catIndex].name = true
                      setEditStates(newEditStates)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>

            {/* Items List */}
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item.id} className="flex items-center group">
                  <span className="w-2 h-2 bg-studio-300 rounded-full mr-3 flex-shrink-0"></span>
                  {editStates.categories[catIndex]?.items[item.id] ? (
                    <div 
                      ref={el => {
                        if (!itemRefs.current[catIndex]) itemRefs.current[catIndex] = {}
                        itemRefs.current[catIndex][item.id] = el
                      }}
                      className="flex-1 flex items-center gap-2"
                    >
                      <input
                        className="flex-1 bg-white text-black p-2 rounded"
                        value={item.text}
                        onChange={(e) => updateItem(category.id, item.id, e.target.value)}
                        autoFocus
                      />
                      <Button
                        className="bg-white text-black hover:bg-gray-100"
                        onClick={() => {
                          const newEditStates = { ...editStates }
                          newEditStates.categories[catIndex].items[item.id] = false
                          setEditStates(newEditStates)
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center gap-2">
                      <span 
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          const newEditStates = { ...editStates }
                          newEditStates.categories[catIndex].items[item.id] = true
                          setEditStates(newEditStates)
                        }}
                      >
                        {item.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteItem(category.id, item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Add Item Button */}
            <Button
              onClick={() => addItem(category.id)}
              className="mt-4 bg-studio-700 hover:bg-studio-600 text-white flex items-center gap-2 w-full"
            >
              <Plus size={16} /> Add Item
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}