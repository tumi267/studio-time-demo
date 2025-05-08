'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Instagram, Twitter, Facebook, Linkedin, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const defaultSocials = [
  { 
    id: 1,
    name: 'Instagram', 
    icon: <Instagram className="h-5 w-5" />,
    url: 'https://instagram.com'
  },
  { 
    id: 2,
    name: 'Twitter', 
    icon: <Twitter className="h-5 w-5" />,
    url: 'https://twitter.com'
  },
  { 
    id: 3,
    name: 'Facebook', 
    icon: <Facebook className="h-5 w-5" />,
    url: 'https://facebook.com'
  },
  { 
    id: 4,
    name: 'LinkedIn', 
    icon: <Linkedin className="h-5 w-5" />,
    url: 'https://linkedin.com'
  },
]

const socialIcons = {
  'Instagram': <Instagram className="h-5 w-5" />,
  'Twitter': <Twitter className="h-5 w-5" />,
  'Facebook': <Facebook className="h-5 w-5" />,
  'LinkedIn': <Linkedin className="h-5 w-5" />,
  'New Platform': <Plus className="h-5 w-5" />
}

export default function SocialLinksAdmin() {
  const [socials, setSocials] = useState(defaultSocials)
  const [sectionTitle, setSectionTitle] = useState("Follow Us")
  const [editStates, setEditStates] = useState({
    sectionTitle: false,
    socials: defaultSocials.reduce((acc, social) => {
      acc[social.id] = { name: false, url: false }
      return acc
    }, {})
  })

  const sectionTitleRef = useRef(null)
  const socialRefs = useRef({})

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editStates.sectionTitle && sectionTitleRef.current && !sectionTitleRef.current.contains(event.target)) {
        setEditStates(prev => ({ ...prev, sectionTitle: false }))
      }

      Object.entries(editStates.socials).forEach(([id, socialState]) => {
        Object.entries(socialState).forEach(([field, isEditing]) => {
          if (isEditing && socialRefs.current[id]?.[field] && !socialRefs.current[id][field].contains(event.target)) {
            const newEditStates = { ...editStates }
            newEditStates.socials[id][field] = false
            setEditStates(newEditStates)
          }
        })
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editStates])

  const addSocial = () => {
    const newId = socials.length > 0 ? Math.max(...socials.map(s => s.id)) + 1 : 1
    const newSocial = {
      id: newId,
      name: "New Platform",
      icon: socialIcons['New Platform'],
      url: "https://"
    }
    
    setSocials([...socials, newSocial])
    
    const newEditStates = { ...editStates }
    newEditStates.socials[newId] = { name: true, url: true }
    setEditStates(newEditStates)
  }

  const deleteSocial = (id) => {
    setSocials(socials.filter(s => s.id !== id))
  }

  const updateSocial = (id, field, value) => {
    setSocials(socials.map(s => {
      if (s.id === id) {
        const updatedSocial = { ...s, [field]: value }
        if (field === 'name') {
          updatedSocial.icon = socialIcons[value] || socialIcons['New Platform']
        }
        return updatedSocial
      }
      return s
    }))
  }

  return (
    <Card className="bg-background/90">
      <CardHeader className="relative">
        {editStates.sectionTitle ? (
          <div ref={sectionTitleRef} className="flex items-center gap-2">
            <Input
              className="text-2xl font-bold"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              autoFocus
            />
            <Button
              size="sm"
              onClick={() => setEditStates(prev => ({ ...prev, sectionTitle: false }))}
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CardTitle 
              className="text-2xl cursor-pointer"
              onClick={() => setEditStates(prev => ({ ...prev, sectionTitle: true }))}
            >
              {sectionTitle}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditStates(prev => ({ ...prev, sectionTitle: true }))}
            >
              Edit
            </Button>
          </div>
        )}
        <Button 
          onClick={addSocial}
          size="sm"
          className="absolute top-4 right-4"
          variant="ghost"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {socials.map((social) => (
            <div key={social.id} className="relative group">
              {editStates.socials[social.id]?.name || editStates.socials[social.id]?.url ? (
                <div className="flex flex-col gap-2 p-2 bg-white rounded-lg shadow-md">
                  <div ref={el => {
                    if (!socialRefs.current[social.id]) socialRefs.current[social.id] = {}
                    socialRefs.current[social.id].name = el
                  }}>
                    <select
                      className="w-full p-2 border rounded"
                      value={social.name}
                      onChange={(e) => updateSocial(social.id, 'name', e.target.value)}
                      autoFocus
                    >
                      {Object.keys(socialIcons).map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                  <div ref={el => {
                    if (!socialRefs.current[social.id]) socialRefs.current[social.id] = {}
                    socialRefs.current[social.id].url = el
                  }}>
                    <Input
                      type="url"
                      value={social.url}
                      onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.socials[social.id] = { name: false, url: false }
                      setEditStates(newEditStates)
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full relative"
                    aria-label={social.name}
                    asChild
                  >
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {social.icon}
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteSocial(social.id)}
                  >
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newEditStates = { ...editStates }
                      newEditStates.socials[social.id] = { name: true, url: true }
                      setEditStates(newEditStates)
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}