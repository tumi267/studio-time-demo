// components/clients/ClientsGrid.jsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { clients } from '../../data/clients.js'

export default function ClientsGrid({ selectedClient, setSelectedClient }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {clients.map((client, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          className={`bg-studio-800 rounded-xl p-4 cursor-pointer transition-all ${
            selectedClient === index ? 'ring-2 ring-studio-300' : ''
          }`}
          onClick={() => setSelectedClient(index)}
        >
          <div className="h-24 flex items-center justify-center mb-3">
            <Image
              src={client.logo}
              alt={client.name}
              width={120}
              height={60}
              className="object-contain max-h-full"
            />
          </div>
          <h3 className="text-lg font-semibold text-center">{client.name}</h3>
        </motion.div>
      ))}
    </div>
  )
}