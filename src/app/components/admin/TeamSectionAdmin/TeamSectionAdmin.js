'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Plus, Trash2 } from 'lucide-react'

const defaultTeamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Head Engineer",
    bio: "20+ years experience in recording and mixing, specializing in analog workflows",
    image: "/team/alex.jpg"
  },
  {
    id: 2,
    name: "Jamie Smith",
    role: "Producer",
    bio: "Grammy-nominated producer with expertise in multiple genres"
  },
  {
    id: 3,
    name: "Taylor Wong",
    role: "Mixing Engineer",
    bio: "Specializes in immersive audio and Dolby Atmos mixes"
  }
]

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers)
  const [sectionTitle, setSectionTitle] = useState("Meet The Team")
  const [editStates, setEditStates] = useState({
    sectionTitle: false,
    members: defaultTeamMembers.reduce((acc, member) => {
      acc[member.id] = { name: false, role: false, bio: false, image: false }
      return acc
    }, {})
  })

  const sectionTitleRef = useRef(null)
  const memberRefs = useRef({})

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editStates.sectionTitle && sectionTitleRef.current && !sectionTitleRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, sectionTitle: false }))
      }

      Object.entries(editStates.members).forEach(([id, memberState]) => {
        Object.entries(memberState).forEach(([field, isEditing]) => {
          if (isEditing && memberRefs.current[id]?.[field] && !memberRefs.current[id][field].contains(event.target)) {
            const newEditStates = { ...editStates }
            newEditStates.members[id][field] = false
            setEditStates(newEditStates)
          }
        })
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editStates])

  const addMember = () => {
    const newId = teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1
    const newMember = {
      id: newId,
      name: "New Member",
      role: "Team Role",
      bio: "Member bio here",
      image: "/team/default.jpg"
    }
    
    setTeamMembers([...teamMembers, newMember])
    
    const newEditStates = { ...editStates }
    newEditStates.members[newId] = { name: true, role: false, bio: false, image: false }
    setEditStates(newEditStates)
  }

  const deleteMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id))
  }

  const updateMember = (id, field, value) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ))
  }

  const handleImageChange = (e, id) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateMember(id, 'image', reader.result)
      }
      reader.readAsDataURL(file)
    }
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
          onClick={addMember}
          className="bg-white text-black hover:bg-gray-100 flex items-center gap-2"
        >
          <Plus size={16} /> Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ y: -5 }}
            className="bg-studio-900 rounded-xl overflow-hidden relative"
          >
            {/* Delete Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={() => deleteMember(member.id)}
            >
              <Trash2 size={16} />
            </Button>

            {/* Image Editor */}
            <div className="relative h-64">
              <Image
                src={member.image || "/team/default.jpg"}
                alt={member.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2">
                {editStates.members[member.id]?.image ? (
                  <div ref={el => {
                    if (!memberRefs.current[member.id]) memberRefs.current[member.id] = {}
                    memberRefs.current[member.id].image = el
                  }} className="flex flex-col items-center gap-3 bg-white p-4 rounded-lg shadow-lg">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-base font-medium transition-colors w-full text-center">
                      Change Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, member.id)}
                        className="hidden"
                      />
                    </label>
                    <Button 
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.members[member.id].image = false
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
                      newEditStates.members[member.id].image = true
                      setEditStates(newEditStates)
                    }}
                    className="bg-white text-black hover:bg-gray-100 shadow-md"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>

            <div className="p-6">
              {/* Name Editor */}
              <div className="mb-1">
                {editStates.members[member.id]?.name ? (
                  <div ref={el => {
                    if (!memberRefs.current[member.id]) memberRefs.current[member.id] = {}
                    memberRefs.current[member.id].name = el
                  }}>
                    <input
                      className="text-xl font-bold bg-white text-black p-2 rounded w-full"
                      value={member.name}
                      onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                      autoFocus
                    />
                    <Button
                      className="mt-2 bg-white text-black hover:bg-gray-100"
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.members[member.id].name = false
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
                        newEditStates.members[member.id].name = true
                        setEditStates(newEditStates)
                      }}
                    >
                      {member.name}
                    </h3>
                    <Button
                      className="bg-white text-black hover:bg-gray-100 mt-2"
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.members[member.id].name = true
                        setEditStates(newEditStates)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>

              {/* Role Editor */}
              <div className="mb-3">
                {editStates.members[member.id]?.role ? (
                  <div ref={el => {
                    if (!memberRefs.current[member.id]) memberRefs.current[member.id] = {}
                    memberRefs.current[member.id].role = el
                  }}>
                    <input
                      className="text-studio-300 bg-white text-black p-2 rounded w-full"
                      value={member.role}
                      onChange={(e) => updateMember(member.id, 'role', e.target.value)}
                      autoFocus
                    />
                    <Button
                      className="mt-2 bg-white text-black hover:bg-gray-100"
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.members[member.id].role = false
                        setEditStates(newEditStates)
                      }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p 
                      className="text-studio-300 cursor-pointer"
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.members[member.id].role = true
                        setEditStates(newEditStates)
                      }}
                    >
                      {member.role}
                    </p>
                    <Button
                      className="bg-white text-black hover:bg-gray-100 mt-2"
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.members[member.id].role = true
                        setEditStates(newEditStates)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>

              {/* Bio Editor */}
              <div>
                {editStates.members[member.id]?.bio ? (
                  <div ref={el => {
                    if (!memberRefs.current[member.id]) memberRefs.current[member.id] = {}
                    memberRefs.current[member.id].bio = el
                  }}>
                    <textarea
                      className="text-studio-200 bg-white text-black p-2 rounded w-full min-h-[100px]"
                      value={member.bio}
                      onChange={(e) => updateMember(member.id, 'bio', e.target.value)}
                      autoFocus
                    />
                    <Button
                      className="mt-2 bg-white text-black hover:bg-gray-100"
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.members[member.id].bio = false
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
                        newEditStates.members[member.id].bio = true
                        setEditStates(newEditStates)
                      }}
                    >
                      {member.bio}
                    </p>
                    <Button
                      className="bg-white text-black hover:bg-gray-100 mt-2"
                      onClick={() => {
                        const newEditStates = { ...editStates }
                        newEditStates.members[member.id].bio = true
                        setEditStates(newEditStates)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}