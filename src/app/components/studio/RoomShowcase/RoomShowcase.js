'use client'

import { useState } from 'react'
import Image from 'next/image'

const rooms = [
  {
    name: "Control Room",
    description: "Our main mixing environment with Yamaha HS8 monitors and SSL console",
    image: "https://media.istockphoto.com/id/1250963239/photo/shot-of-a-modern-music-record-studio-control-desk-with-computer-screen-show-user-interface-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ofh79fco-0otMApOdSsTEVGE2NkKaPoB1xKrll0gsyQ="
  },
  {
    name: "Live Room",
    description: "Spacious tracking room with adjustable acoustic panels",
    image: "https://images.unsplash.com/photo-1707073220898-9e86a9ad5eff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fG11c2ljJTIwbGl2ZSUyMHJvb20lMjByZWNvcmRpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Vocal Booth",
    description: "Isolated booth with pristine vocal chain setup",
    image: "https://images.unsplash.com/photo-1689771455000-7ca175aa03fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWMlMjB2b2NhbCUyMGJvb3RofGVufDB8fDB8fHww"
  }
]

export default function RoomShowcase() {
  const [activeRoom, setActiveRoom] = useState(0)

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">Studio Rooms</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={rooms[activeRoom].image}
              alt={rooms[activeRoom].name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {rooms.map((room, index) => (
            <button
              key={index}
              onClick={() => setActiveRoom(index)}
              className={`w-full p-6 text-left rounded-lg transition-all ${
                activeRoom === index 
                  ? 'bg-studio-300 text-studio-900' 
                  : 'bg-studio-800 hover:bg-studio-700'
              }`}
            >
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="mt-2">{room.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}