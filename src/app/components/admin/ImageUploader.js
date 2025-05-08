'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toaster } from "@/components/ui/toaster"

export default function ImageUploader() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
        Toaster({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    
    try {
      // In a real app, you would upload to your server
      // For now, we'll just log it since you're in dev
      console.log('Uploading file:', file.name)
      
      Toaster({
        title: "Upload successful",
        description: `${file.name} has been uploaded.`,
      })
      setFile(null)
    } catch (error) {
        Toaster({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input 
          id="picture" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
        />
      </div>
      <Button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </Button>
      {file && (
        <div className="mt-2">
          <p className="text-sm">Selected: {file.name}</p>
        </div>
      )}
    </div>
  )
}