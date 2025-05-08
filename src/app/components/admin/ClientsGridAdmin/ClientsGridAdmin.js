'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Paintbrush, Pencil, Plus, Trash2 } from 'lucide-react'
import { clients as initialClients } from '../../../data/clients'

export default function ClientsGridAdmin({ selectedClient, setSelectedClient }) {
  const [clients, setClients] = useState(initialClients)
  const [editMode, setEditMode] = useState(false)
  const [editClientIndex, setEditClientIndex] = useState(null)
  const [newClient, setNewClient] = useState({ logo: '', name: '', description: '' })
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [colorScheme, setColorScheme] = useState({
    cardBg: 'bg-gray-800',
    selectedBorder: 'ring-gray-300'
  })

  // Color options: black, white, gray
  const colorOptions = [
    { name: 'Black', cardBg: 'bg-black', selectedBorder: 'ring-gray-300' },
    { name: 'White', cardBg: 'bg-white', selectedBorder: 'ring-gray-500' },
    { name: 'Gray', cardBg: 'bg-gray-800', selectedBorder: 'ring-gray-300' }
  ]

  const handleLogoChange = (e, index) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedClients = [...clients]
        updatedClients[index].logo = reader.result
        setClients(updatedClients)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddClient = () => {
    if (newClient.name.trim() && newClient.logo) {
      setClients([...clients, newClient])
      setNewClient({ logo: '', name: '', description: '' })
    }
  }

  const handleRemoveClient = (index) => {
    const updatedClients = [...clients]
    updatedClients.splice(index, 1)
    setClients(updatedClients)
    if (selectedClient === index) {
      setSelectedClient(null)
    } else if (selectedClient > index) {
      setSelectedClient(selectedClient - 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Client Portfolio</h2>
        <div className="flex gap-2">
          <Button
            variant={editMode ? 'default' : 'outline'}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Done Editing' : 'Edit Clients'}
          </Button>
          
          {editMode && (
            <Button
              variant="secondary"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <Paintbrush className="h-4 w-4 mr-2" /> Colors
            </Button>
          )}
        </div>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <div className="bg-white p-4 rounded shadow-lg mb-4">
          <h4 className="font-medium mb-2">Card Color</h4>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: editMode ? 1 : 1.03 }}
            className={`${colorScheme.cardBg} rounded-xl p-4 cursor-pointer transition-all relative ${
              colorScheme.cardBg === 'bg-white' ? 'text-black' : 'text-white'
            } ${selectedClient === index ? `${colorScheme.selectedBorder} ring-2` : ''}`}
            onClick={() => !editMode && setSelectedClient(index)}
          >
            {editMode && (
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-1 h-6 w-6 ${
                    colorScheme.cardBg === 'bg-white' ? 'text-black hover:bg-gray-200' : 'text-white hover:bg-gray-700'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditClientIndex(editClientIndex === index ? null : index)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-1 h-6 w-6 text-red-500 hover:text-red-600 ${
                    colorScheme.cardBg === 'bg-white' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveClient(index)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="h-24 flex items-center justify-center mb-3">
              {editClientIndex === index ? (
                <div className="flex flex-col items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoChange(e, index)}
                    className="max-w-[120px]"
                  />
                  <Input
                    value={client.name}
                    onChange={(e) => {
                      const updatedClients = [...clients]
                      updatedClients[index].name = e.target.value
                      setClients(updatedClients)
                    }}
                    className="text-center"
                  />
                </div>
              ) : (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-full"
                />
              )}
            </div>
            
            {editClientIndex !== index && (
              <h3 className="text-lg font-semibold text-center">{client.name}</h3>
            )}
          </motion.div>
        ))}

        {editMode && (
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`${colorScheme.cardBg} rounded-xl p-4 border-2 border-dashed ${
              colorScheme.cardBg === 'bg-white' ? 'border-gray-400 text-black' : 'border-gray-500 text-white'
            } flex flex-col items-center justify-center`}
          >
            <div className="h-24 flex flex-col items-center justify-center mb-3 gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setNewClient({...newClient, logo: reader.result})
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="max-w-[120px]"
              />
              <Input
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                placeholder="Client name"
                className="text-center"
              />
            </div>
            <Button
              size="sm"
              onClick={handleAddClient}
              disabled={!newClient.name.trim() || !newClient.logo}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Client
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}