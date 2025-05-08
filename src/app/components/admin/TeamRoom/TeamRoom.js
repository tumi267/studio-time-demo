'use client'

import { useState, useRef } from 'react'
import { teamMembers as initialTeamMembers } from '../../../data/bookingdates'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import imageCompression from 'browser-image-compression'

// Initialize with images for team members
const initialTeamMembersWithImages = initialTeamMembers.map((member, index) => ({
  ...member,
  image: [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
  ][index % 3]
}))

const initialRooms = [
  {
    id: 1,
    name: "Control Room",
    description: "Our main mixing environment with Yamaha HS8 monitors and SSL console",
    image: "https://media.istockphoto.com/id/1250963239/photo/shot-of-a-modern-music-record-studio-control-desk-with-computer-screen-show-user-interface-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ofh79fco-0otMApOdSsTEVGE2NkKaPoB1xKrll0gsyQ=",
    rate: 300
  },
  {
    id: 2,
    name: "Live Room",
    description: "Spacious tracking room with adjustable acoustic panels",
    image: "https://images.unsplash.com/photo-1707073220898-9e86a9ad5eff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fG11c2ljJTIwbGl2ZSUyMHJvb20lMjByZWNvcmRpbmd8ZW58MHx8MHx8fDA%3D",
    rate: 250
  },
  {
    id: 3,
    name: "Vocal Booth",
    description: "Isolated booth with pristine vocal chain setup",
    image: "https://images.unsplash.com/photo-1689771455000-7ca175aa03fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWMlMjB2b2NhbCUyMGJvb3RofGVufDB8fDB8fHww",
    rate: 200
  }
]

export default function TeamRoom() {
  const [rooms, setRooms] = useState(initialRooms)
  const [teamMembers, setTeamMembers] = useState(initialTeamMembersWithImages)
  const [editingItem, setEditingItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    rate: '',
    role: '',
    id: null
  })
  const [imagePreview, setImagePreview] = useState('')
  const [fileError, setFileError] = useState('')
  const [isCompressing, setIsCompressing] = useState(false)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.2, // 200KB
      maxWidthOrHeight: 1024,
      useWebWorker: true
    }
    
    try {
      setIsCompressing(true)
      const compressedFile = await imageCompression(file, options)
      setIsCompressing(false)
      return compressedFile
    } catch (error) {
      setIsCompressing(false)
      setFileError('Error compressing image')
      console.error(error)
      return null
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file type
    if (!file.type.match('image.*')) {
      setFileError('Please select an image file')
      return
    }

    setFileError('')
    
    // Compress the image
    const compressedFile = await compressImage(file)
    if (!compressedFile) return

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      setFormData(prev => ({
        ...prev,
        image: reader.result
      }))
    }
    reader.readAsDataURL(compressedFile)
  }

  const openAddModal = (type) => {
    setEditingItem(null)
    setFormData({
      name: '',
      description: '',
      image: '',
      rate: '',
      role: type === 'team' ? '' : undefined,
      id: null
    })
    setImagePreview('')
    setFileError('')
    setIsModalOpen(true)
  }

  const openEditModal = (item, type) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || '',
      image: item.image || '',
      rate: item.rate,
      role: type === 'team' ? item.role : undefined,
      id: item.id
    })
    setImagePreview(item.image || '')
    setFileError('')
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingItem) {
      // Update existing item
      if (formData.role !== undefined) {
        // Team member
        setTeamMembers(teamMembers.map(member => 
          member.id === editingItem.id ? { ...formData, id: editingItem.id } : member
        ))
      } else {
        // Room
        setRooms(rooms.map(room => 
          room.id === editingItem.id ? { ...formData, id: editingItem.id } : room
        ))
      }
    } else {
      // Add new item
      if (formData.role !== undefined) {
        // Team member
        const newMember = {
          ...formData,
          id: Math.max(...teamMembers.map(m => m.id), 0) + 1
        }
        setTeamMembers([...teamMembers, newMember])
      } else {
        // Room
        const newRoom = {
          ...formData,
          id: Math.max(...rooms.map(r => r.id), 0) + 1
        }
        setRooms([...rooms, newRoom])
      }
    }
    
    setIsModalOpen(false)
  }

  const handleDelete = (id, type) => {
    if (type === 'rooms') {
      setRooms(rooms.filter(room => room.id !== id))
    } else {
      setTeamMembers(teamMembers.filter(member => member.id !== id))
    }
  }

  return (
    <div className="p-6">
      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rooms">
          <div className="mb-6">
            <Button onClick={() => openAddModal('rooms')}>
              Add Room
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => (
              <Card key={room.id}>
                <CardHeader>
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {room.image && (
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                  <p className="mt-4 font-medium">Rate: R{room.rate}/hr</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => openEditModal(room, 'rooms')}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleDelete(room.id, 'rooms')}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="team">
          <div className="mb-6">
            <Button onClick={() => openAddModal('team')}>
              Add Team Member
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Rate (R/hr)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell>
                    {member.image && (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.rate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => openEditModal(member, 'team')}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(member.id, 'team')}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit' : 'Add'} {formData.role !== undefined ? 'Team Member' : 'Room'}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update' : 'Create new'} {formData.role !== undefined ? 'team member' : 'room'} details
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>

              {formData.role !== undefined ? (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Photo
                    </Label>
                    <div className="col-span-3 space-y-2">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="w-full"
                      />
                      {fileError && (
                        <p className="text-sm text-red-500">{fileError}</p>
                      )}
                      {isCompressing && (
                        <p className="text-sm text-gray-500">Compressing image...</p>
                      )}
                      {imagePreview && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-1">Preview:</p>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="h-32 w-32 object-cover rounded-full border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <div className="col-span-3 space-y-2">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="w-full"
                      />
                      {fileError && (
                        <p className="text-sm text-red-500">{fileError}</p>
                      )}
                      {isCompressing && (
                        <p className="text-sm text-gray-500">Compressing image...</p>
                      )}
                      {imagePreview && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-1">Preview:</p>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="h-32 object-contain border rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rate" className="text-right">
                  Hourly Rate (R)
                </Label>
                <Input
                  id="rate"
                  name="rate"
                  type="number"
                  value={formData.rate}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCompressing}>
                {editingItem ? 'Update' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}