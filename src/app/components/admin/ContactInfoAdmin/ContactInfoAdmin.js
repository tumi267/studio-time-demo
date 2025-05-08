'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ContactInfoAdmin() {
  // Contact information state
  const [contactInfo, setContactInfo] = useState({
    street: '123 Studio Street',
    area: 'Creative District, CA 90210',
    phone: '+27 72 123 4567',
    hours: 'Mon-Fri, 9am-6pm',
    email: 'hello@studiocreative.com',
    responseTime: 'We reply within 24 hours'
  })

  // Edit state
  const [editStreet, setEditStreet] = useState(false)
  const [editArea, setEditArea] = useState(false)
  const [editPhone, setEditPhone] = useState(false)
  const [editHours, setEditHours] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editResponseTime, setEditResponseTime] = useState(false)

  // Refs for click outside detection
  const streetRef = useRef(null)
  const areaRef = useRef(null)
  const phoneRef = useRef(null)
  const hoursRef = useRef(null)
  const emailRef = useRef(null)
  const responseTimeRef = useRef(null)

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editStreet && streetRef.current && !streetRef.current.contains(e.target)) {
        setEditStreet(false)
      }
      if (editArea && areaRef.current && !areaRef.current.contains(e.target)) {
        setEditArea(false)
      }
      if (editPhone && phoneRef.current && !phoneRef.current.contains(e.target)) {
        setEditPhone(false)
      }
      if (editHours && hoursRef.current && !hoursRef.current.contains(e.target)) {
        setEditHours(false)
      }
      if (editEmail && emailRef.current && !emailRef.current.contains(e.target)) {
        setEditEmail(false)
      }
      if (editResponseTime && responseTimeRef.current && !responseTimeRef.current.contains(e.target)) {
        setEditResponseTime(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editStreet, editArea, editPhone, editHours, editEmail, editResponseTime])

  return (
    <Card className="bg-background/90">
      <CardHeader>
        <CardTitle className="text-2xl">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address Section */}
        <div className="flex items-start gap-4">
          <MapPin className="h-5 w-5 mt-0.5 text-primary" />
          <div className="space-y-1">
            <div className="flex items-center gap-2" ref={streetRef}>
              {editStreet ? (
                <>
                  <Input
                    className="text-sm font-medium h-8 w-64"
                    value={contactInfo.street}
                    onChange={(e) => setContactInfo({...contactInfo, street: e.target.value})}
                  />
                  <Button 
                    size="sm" 
                    className="h-8"
                    onClick={() => setEditStreet(false)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">{contactInfo.street}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-1"
                    onClick={() => setEditStreet(true)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2" ref={areaRef}>
              {editArea ? (
                <>
                  <Input
                    className="text-sm text-muted-foreground h-8 w-64"
                    value={contactInfo.area}
                    onChange={(e) => setContactInfo({...contactInfo, area: e.target.value})}
                  />
                  <Button 
                    size="sm" 
                    className="h-8"
                    onClick={() => setEditArea(false)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{contactInfo.area}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-1"
                    onClick={() => setEditArea(true)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Phone Section */}
        <div className="flex items-start gap-4">
          <Phone className="h-5 w-5 mt-0.5 text-primary" />
          <div className="space-y-1">
            <div className="flex items-center gap-2" ref={phoneRef}>
              {editPhone ? (
                <>
                  <Input
                    className="text-sm font-medium h-8 w-64"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  />
                  <Button 
                    size="sm" 
                    className="h-8"
                    onClick={() => setEditPhone(false)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">{contactInfo.phone}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-1"
                    onClick={() => setEditPhone(true)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2" ref={hoursRef}>
              {editHours ? (
                <>
                  <Input
                    className="text-sm text-muted-foreground h-8 w-64"
                    value={contactInfo.hours}
                    onChange={(e) => setContactInfo({...contactInfo, hours: e.target.value})}
                  />
                  <Button 
                    size="sm" 
                    className="h-8"
                    onClick={() => setEditHours(false)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{contactInfo.hours}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-1"
                    onClick={() => setEditHours(true)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Email Section */}
        <div className="flex items-start gap-4">
          <Mail className="h-5 w-5 mt-0.5 text-primary" />
          <div className="space-y-1">
            <div className="flex items-center gap-2" ref={emailRef}>
              {editEmail ? (
                <>
                  <Input
                    className="text-sm font-medium h-8 w-64"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  />
                  <Button 
                    size="sm" 
                    className="h-8"
                    onClick={() => setEditEmail(false)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">{contactInfo.email}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-1"
                    onClick={() => setEditEmail(true)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2" ref={responseTimeRef}>
              {editResponseTime ? (
                <>
                  <Input
                    className="text-sm text-muted-foreground h-8 w-64"
                    value={contactInfo.responseTime}
                    onChange={(e) => setContactInfo({...contactInfo, responseTime: e.target.value})}
                  />
                  <Button 
                    size="sm" 
                    className="h-8"
                    onClick={() => setEditResponseTime(false)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{contactInfo.responseTime}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-1"
                    onClick={() => setEditResponseTime(true)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}