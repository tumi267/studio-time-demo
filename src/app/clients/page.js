// app/clients/page.js
'use client'
import ClientsHero from '../components/clients/ClientsHero.js'
import ClientsGrid from '../components/clients/ClientsGrid.js'
import ClientDetail from '../components/clients/ClientDetail.js'
import { useState } from 'react'

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState(0)

  return (
    <div className="bg-studio-900 min-h-screen">
      <ClientsHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Clients Grid - Scrollable */}
          <div className="lg:w-2/3">
            <ClientsGrid 
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
          </div>
          
          {/* Client Details - Fixed */}
          <div className="lg:w-1/3 lg:sticky lg:top-8 lg:h-[calc(100vh-64px)] lg:overflow-y-auto">
            <ClientDetail selectedClient={selectedClient} />
          </div>
        </div>
      </div>
    </div>
  )
}