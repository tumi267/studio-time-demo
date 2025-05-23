'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import studiotime from '../../../../public/studiotime.png'
import { motion, useAnimation } from 'framer-motion'
import { Menu, X } from 'lucide-react'

function Nav() {
  const [scrollingDown, setScrollingDown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true) // Scrolling down
      } else {
        setScrollingDown(false) // Scrolling up
      }

      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Control navbar visibility based on scrolling direction
    if (scrollingDown) {
      controls.start({ y: '-100%', opacity: 0 })
    } else {
      controls.start({ y: 0, opacity: 1 })
    }
  }, [scrollingDown, controls])

  return (
    <>
      <motion.nav
        className="bg-[#b1b1b1] py-4 sticky top-0 z-50 px-4 sm:px-8 lg:px-20"
        animate={controls}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="z-50">
            <div className="h-12 w-32 sm:h-[74px] sm:w-[200px] relative">
              <Image
                src={studiotime}
                alt="logo"
                fill
                loading="lazy"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 text-[#2b2b2b] font-[600] font-montserrat">
            <Link href="/studio">Studio</Link>
            <Link href="/clients">Clients</Link>
            <Link href="/photogallery">Photo</Link>
            <Link href="/about">About</Link>
            <Link href="/booking">Booking</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 text-[#2b2b2b]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 bg-[#b1b1b1] z-40 pt-24 px-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-6 text-[#2b2b2b] font-[600] font-montserrat text-xl">
          <Link href="/studio" onClick={() => setMobileMenuOpen(false)}>Studio</Link>
          <Link href="/clients" onClick={() => setMobileMenuOpen(false)}>Clients</Link>
          <Link href="/photogallery" onClick={() => setMobileMenuOpen(false)}>Photo</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>Booking</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      </motion.div>
    </>
  )
}

export default Nav