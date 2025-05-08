'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Paintbrush, Pencil, Plus, Trash2 } from 'lucide-react'
import { clients } from '../../../data/clients'

export default function ClientDetailAdmin({ selectedClient, onUpdateClient }) {
  const [clientData, setClientData] = useState(clients[selectedClient])
  const [editName, setEditName] = useState(false)
  const [editLogo, setEditLogo] = useState(false)
  const [editQuote, setEditQuote] = useState(false)
  const [editProjects, setEditProjects] = useState(false)
  const [newProject, setNewProject] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [colorScheme, setColorScheme] = useState({
    cardBg: 'bg-studio-800',
    projectBg: 'bg-studio-700',
    accent: 'text-studio-300',
    bullet: 'bg-studio-300'
  })

  const nameRef = useRef(null)
  const logoRef = useRef(null)
  const quoteRef = useRef(null)
  const projectsRef = useRef(null)
  const colorPickerRef = useRef(null)

  useEffect(() => {
    setClientData(clients[selectedClient])
  }, [selectedClient, clients])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editName && nameRef.current && !nameRef.current.contains(e.target)) {
        setEditName(false)
      }
      if (editLogo && logoRef.current && !logoRef.current.contains(e.target)) {
        setEditLogo(false)
      }
      if (editQuote && quoteRef.current && !quoteRef.current.contains(e.target)) {
        setEditQuote(false)
      }
      if (editProjects && projectsRef.current && !projectsRef.current.contains(e.target)) {
        setEditProjects(false)
      }
      if (showColorPicker && colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editName, editLogo, editQuote, editProjects, showColorPicker])

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setClientData({...clientData, logo: reader.result})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProject = () => {
    if (newProject.trim()) {
      setClientData({
        ...clientData,
        projects: [...clientData?.projects, newProject?.trim()]
      })
      setNewProject('')
    }
  }

  const handleRemoveProject = (index) => {
    const updatedProjects = [...clientData.projects]
    updatedProjects.splice(index, 1)
    setClientData({...clientData, projects: updatedProjects})
  }

  const handleSaveChanges = () => {
    onUpdateClient(selectedClient, clientData)
  }

  const colorOptions = [
    { name: 'Studio', cardBg: 'bg-studio-800', projectBg: 'bg-studio-700', accent: 'text-studio-300', bullet: 'bg-studio-300' },
    { name: 'Blue', cardBg: 'bg-blue-800', projectBg: 'bg-blue-700', accent: 'text-blue-300', bullet: 'bg-blue-300' },
    { name: 'Gray', cardBg: 'bg-gray-800', projectBg: 'bg-gray-700', accent: 'text-gray-300', bullet: 'bg-gray-300' }
  ]

  return (
    <motion.div
      key={selectedClient}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${colorScheme.cardBg} rounded-xl p-6 relative`}
    >


      {/* Color Picker Popover */}
      {showColorPicker && (
        <div 
          ref={colorPickerRef}
          className="absolute top-12 right-4 z-20 bg-white p-4 rounded shadow-lg"
        >
          <h4 className="font-medium mb-2">Color Scheme</h4>
          <div className="flex gap-2">
            {colorOptions.map((scheme) => (
              <button
                key={scheme.name}
                onClick={() => setColorScheme(scheme)}
                className={`h-8 w-8 rounded-full ${scheme.cardBg} ${
                  colorScheme.cardBg === scheme.cardBg ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                title={scheme.name}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center mb-6" ref={logoRef}>
        <div className="w-full h-32 relative mb-4">
          {editLogo ? (
            <div className="flex flex-col items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="max-w-[180px]"
              />
              <Button 
                size="sm" 
                onClick={() => setEditLogo(false)}
              >
                Save Logo
              </Button>
            </div>
          ) : (
            <>
              <Image
                src={clientData?.logo}
                alt={clientData?.name}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                onClick={() => setEditLogo(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        
        <div ref={nameRef} className="flex items-center gap-2">
          {editName ? (
            <>
              <Input
                className="text-2xl font-bold text-center"
                value={clientData?.name}
                onChange={(e) => setClientData({...clientData, name: e.target.value})}
              />
              <Button 
                size="sm"
                onClick={() => setEditName(false)}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center">{clientData?.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditName(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div ref={projectsRef}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Projects</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditProjects(!editProjects)}
            >
              {editProjects ? 'Done' : 'Edit'}
            </Button>
          </div>
          
          <ul className="space-y-2">
            {clientData?.projects?.map((project, i) => (
              <li key={i} className={`flex items-center ${colorScheme.projectBg} px-3 py-2 rounded`}>
                <span className={`w-2 h-2 ${colorScheme.bullet} rounded-full mr-2`}></span>
                {editProjects ? (
                  <div className="flex items-center justify-between w-full">
                    <Input
                      value={project}
                      onChange={(e) => {
                        const updatedProjects = [...clientData?.projects]
                        updatedProjects[i] = e.target.value
                        setClientData({...clientData, projects: updatedProjects})
                      }}
                      className="flex-1 mr-2"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProject(i)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  project
                )}
              </li>
            ))}
            
            {editProjects && (
              <li className={`flex items-center ${colorScheme.projectBg} px-3 py-2 rounded`}>
                <span className={`w-2 h-2 ${colorScheme.bullet} rounded-full mr-2`}></span>
                <Input
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  placeholder="New project name"
                  className="flex-1 mr-2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAddProject}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </li>
            )}
          </ul>
        </div>
        
        <div className={`${colorScheme.projectBg} p-4 rounded-lg`} ref={quoteRef}>
          <svg className={`w-6 h-6 ${colorScheme.accent} mb-2`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          {editQuote ? (
            <div className="flex flex-col gap-2">
              <Input
                value={clientData.quote}
                onChange={(e) => setClientData({...clientData, quote: e.target.value})}
                className="italic"
              />
              <Button 
                size="sm"
                onClick={() => setEditQuote(false)}
              >
                Save Quote
              </Button>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <p className="italic flex-1">{clientData?.quote}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditQuote(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button 
          className="w-full"
          onClick={handleSaveChanges}
        >
          Save All Changes
        </Button>
      </div>
    </motion.div>
  )
}