'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import studiotime from '../../../../public/studiotime.png'
import { motion, useAnimation } from 'framer-motion'

function Nav() {
  const [scrollingDown, setScrollingDown] = useState(false)
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
    <motion.nav
      className="bg-[#b1b1b1] py-4 sticky top-0 z-50"
      style={{ paddingLeft: '5em', paddingRight: '5em' }}
      animate={controls}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="h-[74px] w-[200px] relative">
            <Image
              src={studiotime}
              alt="logo"
              fill
              loading="lazy"
              className="object-contain"
            />
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-6 text-[#2b2b2b] font-[600] font-montserrat">
          <Link href="/studio">Studio</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/photogallery">Photo</Link>
          <Link href="/about">About</Link>
          <Link href="/booking">Booking</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Nav