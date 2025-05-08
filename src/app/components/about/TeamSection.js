'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Head Engineer",
    bio: "20+ years experience in recording and mixing, specializing in analog workflows",
    image: "/team/alex.jpg"
  },
  // Add 3-5 more team members
]

export default function TeamSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-12 text-center">Meet The Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-studio-900 rounded-xl overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-studio-300 mb-3">{member.role}</p>
              <p className="text-studio-200">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}