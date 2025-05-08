// components/clients/ClientDetail.jsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { clients } from '../../data/clients.js'

export default function ClientDetail({ selectedClient }) {
  const client = clients[selectedClient]

  return (
    <motion.div
      key={selectedClient}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-studio-800 rounded-xl p-6"
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-full h-32 relative mb-4">
          <Image
            src={client.logo}
            alt={client.name}
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-center">{client.name}</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Projects</h3>
          <ul className="space-y-2">
            {client.projects.map((project, i) => (
              <li key={i} className="flex items-center bg-studio-700 px-3 py-2 rounded">
                <span className="w-2 h-2 bg-studio-300 rounded-full mr-2"></span>
                {project}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-studio-700 p-4 rounded-lg">
          <svg className="w-6 h-6 text-studio-300 mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="italic">{client.quote}</p>
        </div>
      </div>
    </motion.div>
  )
}