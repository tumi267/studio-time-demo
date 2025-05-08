'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function MapEmbed() {
  const [mapConfig, setMapConfig] = useState({
    title: "Find Us",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.041739500607!2d28.187559315029034!3d-26.195069983442036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1b6e4523a5%3A0x4ecc6b3c6d5f3b8a!2sPretoria%20City%20Hall!5e0!3m2!1sen!2sza!4v1620000000000!5m2!1sen!2sza",
    height: "300",
    address: "Pretoria City Hall"
  })

  const [editTitle, setEditTitle] = useState(false)
  const [editEmbedUrl, setEditEmbedUrl] = useState(false)
  const [editHeight, setEditHeight] = useState(false)
  const [editAddress, setEditAddress] = useState(false)
  const [inputMode, setInputMode] = useState('url') // 'url' or 'address'

  const titleRef = useRef(null)
  const embedUrlRef = useRef(null)
  const heightRef = useRef(null)
  const addressRef = useRef(null)

  const convertAddressToEmbedUrl = (address) => {
    // Basic embed URL that works without API key (limited functionality)
    const encodedAddress = encodeURIComponent(address)
    return `https://maps.google.com/maps?q=${encodedAddress}&output=embed`
  }

  const handleAddressSubmit = () => {
    const embedUrl = convertAddressToEmbedUrl(mapConfig.address)
    setMapConfig(prev => ({...prev, embedUrl}))
    setEditAddress(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editTitle && titleRef.current && !titleRef.current.contains(e.target)) {
        setEditTitle(false)
      }
      if (editEmbedUrl && embedUrlRef.current && !embedUrlRef.current.contains(e.target)) {
        setEditEmbedUrl(false)
      }
      if (editHeight && heightRef.current && !heightRef.current.contains(e.target)) {
        setEditHeight(false)
      }
      if (editAddress && addressRef.current && !addressRef.current.contains(e.target)) {
        setEditAddress(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editTitle, editEmbedUrl, editHeight, editAddress])

  return (
    <Card className="bg-background/90">
      <CardHeader>
        <div className="flex items-center gap-2" ref={titleRef}>
          {editTitle ? (
            <>
              <Input
                className="text-2xl font-semibold flex-1"
                value={mapConfig.title}
                onChange={(e) => setMapConfig({...mapConfig, title: e.target.value})}
              />
              <Button 
                size="sm"
                onClick={() => setEditTitle(false)}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl">{mapConfig.title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditTitle(true)}
              >
                Edit
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={inputMode === 'url' ? 'default' : 'outline'}
            onClick={() => setInputMode('url')}
            size="sm"
          >
            Paste Embed URL
          </Button>
          <Button
            variant={inputMode === 'address' ? 'default' : 'outline'}
            onClick={() => setInputMode('address')}
            size="sm"
          >
            Enter Address
          </Button>
        </div>

        {inputMode === 'url' ? (
          <div className="flex items-center gap-2" ref={embedUrlRef}>
            {editEmbedUrl ? (
              <>
                <Input
                  className="flex-1"
                  value={mapConfig.embedUrl}
                  onChange={(e) => setMapConfig({...mapConfig, embedUrl: e.target.value})}
                  placeholder="Paste Google Maps embed URL"
                />
                <Button 
                  size="sm"
                  onClick={() => setEditEmbedUrl(false)}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEditEmbedUrl(true)}
              >
                {mapConfig.embedUrl ? "Edit Embed URL" : "Add Embed URL"}
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2" ref={addressRef}>
            {editAddress ? (
              <>
                <Input
                  className="flex-1"
                  value={mapConfig.address}
                  onChange={(e) => setMapConfig({...mapConfig, address: e.target.value})}
                  placeholder="Enter full address (e.g., '1600 Amphitheatre Parkway')"
                />
                <Button 
                  size="sm"
                  onClick={handleAddressSubmit}
                >
                  <Search className="h-4 w-4 mr-1" /> Search
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEditAddress(true)}
              >
                {mapConfig.address ? `Edit Address: ${mapConfig.address}` : "Enter Address"}
              </Button>
            )}
          </div>
        )}

        <div className="flex items-center gap-2" ref={heightRef}>
          {editHeight ? (
            <>
              <Input
                className="w-24"
                type="number"
                value={mapConfig.height}
                onChange={(e) => setMapConfig({...mapConfig, height: e.target.value})}
                placeholder="Height in px"
              />
              <Button 
                size="sm"
                onClick={() => setEditHeight(false)}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => setEditHeight(true)}
            >
              Set Map Height: {mapConfig.height}px
            </Button>
          )}
        </div>

        {mapConfig.embedUrl && (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={mapConfig.embedUrl}
              width="100%"
              height={mapConfig.height}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
              title="Location Map"
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  )
}