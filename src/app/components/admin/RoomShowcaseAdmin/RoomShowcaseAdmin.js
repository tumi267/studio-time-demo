'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

const defaultRooms = [
  {
    id: 1,
    name: "Control Room",
    description: "Our main mixing environment with Yamaha HS8 monitors and SSL console",
    image: "https://media.istockphoto.com/id/1250963239/photo/shot-of-a-modern-music-record-studio-control-desk-with-computer-screen-show-user-interface-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ofh79fco-0otMApOdSsTEVGE2NkKaPoB1xKrll0gsyQ="
  },
  {
    id: 2,
    name: "Live Room",
    description: "Spacious tracking room with adjustable acoustic panels",
    image: "https://images.unsplash.com/photo-1707073220898-9e86a9ad5eff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fG11c2ljJTIwbGl2ZSUyMHJvb20lMjByZWNvcmRpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    name: "Vocal Booth",
    description: "Isolated booth with pristine vocal chain setup",
    image: "https://images.unsplash.com/photo-1689771455000-7ca175aa03fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWMlMjB2b2NhbCUyMGJvb3RofGVufDB8fDB8fHww"
  }
]

export default function RoomShowcase() {
  const [rooms, setRooms] = useState(defaultRooms)
  const [activeRoom, setActiveRoom] = useState(0)
  const [sectionTitle, setSectionTitle] = useState("Studio Rooms")
  const [editStates, setEditStates] = useState({
    sectionTitle: false,
    rooms: defaultRooms.reduce((acc, _, index) => {
      acc[index] = { name: false, description: false, image: false }
      return acc
    }, {})
  })

  const sectionTitleRef = useRef(null)
  const roomRefs = useRef({})

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editStates.sectionTitle && sectionTitleRef.current && !sectionTitleRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, sectionTitle: false }))
      }

      Object.entries(editStates.rooms).forEach(([index, fields]) => {
        Object.entries(fields).forEach(([field, isEditing]) => {
          if (isEditing && roomRefs.current[index] && roomRefs.current[index][field] && 
              !roomRefs.current[index][field].contains(event.target)) {
            const newEditStates = { ...editStates }
            newEditStates.rooms[index][field] = false
            setEditStates(newEditStates)
          }
        })
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editStates])

  const addRoom = () => {
    const newId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1
    const newRoom = {
      id: newId,
      name: "New Room",
      description: "Room description here",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a5d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBzdHVkaW98ZW58MHx8MHx8fDA%3D"
    }
    
    setRooms([...rooms, newRoom])
    setActiveRoom(rooms.length)
    
    const newEditStates = { ...editStates }
    newEditStates.rooms[rooms.length] = { name: true, description: false, image: false }
    setEditStates(newEditStates)
  }

  const deleteRoom = (id) => {
    const newRooms = rooms.filter(r => r.id !== id)
    setRooms(newRooms)
    if (activeRoom >= newRooms.length) {
      setActiveRoom(newRooms.length - 1)
    }
  }

  const updateRoom = (id, field, value) => {
    setRooms(rooms.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ))
  }

  const handleImageChange = (e, id) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateRoom(id, 'image', reader.result)
      }
      reader.readAsDataURL(file)
    }
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
          onClick={addRoom}
          className="bg-white text-black hover:bg-gray-100 flex items-center gap-2"
        >
          <Plus size={16} /> Add Room
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
            {rooms.length > 0 && (
              <>
                <Image
                  src={rooms[activeRoom].image}
                  alt={rooms[activeRoom].name}
                  fill
                
                />
                <div className="absolute top-4 right-4 z-10">
                  {editStates.rooms[activeRoom]?.image ? (
                    <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-lg shadow-lg">
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-base font-medium transition-colors w-full text-center">
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, rooms[activeRoom].id)}
                          className="hidden"
                        />
                      </label>
                      <Button 
                        onClick={() => {
                          const newEditStates = { ...editStates }
                          newEditStates.rooms[activeRoom].image = false
                          setEditStates(newEditStates)
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.rooms[activeRoom].image = true
                        setEditStates(newEditStates)
                      }}
                      className="bg-white text-black hover:bg-gray-100 shadow-md"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {rooms.map((room, index) => (
            <div 
              key={room.id}
              className={`relative p-6 rounded-lg transition-all ${
                activeRoom === index 
                  ? 'bg-studio-300 text-studio-900' 
                  : 'bg-studio-800 hover:bg-studio-700'
              }`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={() => deleteRoom(room.id)}
              >
                <Trash2 size={16} />
              </Button>

              <button 
                className="w-full text-left"
                onClick={() => setActiveRoom(index)}
              >
                <div className="mb-2">
                  {editStates.rooms[index]?.name ? (
                    <div ref={el => {
                      if (!roomRefs.current[index]) roomRefs.current[index] = {}
                      roomRefs.current[index].name = el
                    }}>
                      <input
                        className="text-xl font-semibold bg-white text-black p-2 rounded w-full"
                        value={room.name}
                        onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                        autoFocus
                      />
                      <Button
                        className="mt-2 bg-white text-black hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          const newEditStates = { ...editStates }
                          newEditStates.rooms[index].name = false
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
                        onClick={(e) => {
                          e.stopPropagation()
                          const newEditStates = { ...editStates }
                          newEditStates.rooms[index].name = true
                          setEditStates(newEditStates)
                        }}
                      >
                        {room.name}
                      </h3>
                      <Button
                        className="bg-white text-black hover:bg-gray-100 mt-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          const newEditStates = { ...editStates }
                          newEditStates.rooms[index].name = true
                          setEditStates(newEditStates)
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  {editStates.rooms[index]?.description ? (
                    <div ref={el => {
                      if (!roomRefs.current[index]) roomRefs.current[index] = {}
                      roomRefs.current[index].description = el
                    }}>
                      <textarea
                        className="w-full bg-white text-black p-2 rounded"
                        value={room.description}
                        onChange={(e) => updateRoom(room.id, 'description', e.target.value)}
                        autoFocus
                      />
                      <Button
                        className="mt-2 bg-white text-black hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          const newEditStates = { ...editStates }
                          newEditStates.rooms[index].description = false
                          setEditStates(newEditStates)
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p 
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          const newEditStates = { ...editStates }
                          newEditStates.rooms[index].description = true
                          setEditStates(newEditStates)
                        }}
                      >
                        {room.description}
                      </p>
                      <Button
                        className="bg-white text-black hover:bg-gray-100 mt-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          const newEditStates = { ...editStates }
                          newEditStates.rooms[index].description = true
                          setEditStates(newEditStates)
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}