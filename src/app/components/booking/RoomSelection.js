'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

export default function RoomSelection({ rooms, onSelect, onNext, onBack }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSelect = (room) => {
    setSelectedRoom(room);
    onSelect(room);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Studio Room</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card 
            key={room.id}
            className={`p-4 cursor-pointer transition-all ${
              selectedRoom?.id === room.id 
                ? 'border-primary border-2 bg-primary/10' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => handleSelect(room)}
          >
            <h3 className="font-medium">{room.name}</h3>
            <p className="text-muted-foreground">R {room.rate}/hour</p>
            <ul className="mt-2 text-sm text-muted-foreground">
              <li>• 24-channel mixer</li>
              <li>• Professional mics</li>
              <li>• Soundproofed</li>
            </ul>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!selectedRoom}>
          Next
        </Button>
      </div>
    </div>
  );
}