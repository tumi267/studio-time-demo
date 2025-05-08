'use client'
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
const ParticleEffectImage = ({ src }) => {
  // const canvasRef = useRef(null)
  // const [canvasSize, setCanvasSize] = useState({
  //   width: window.innerWidth,
  //   height: 537, // fixed height of 537px
  // })

  // const imageRef = useRef(null) // Reference for the image element

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const ctx = canvas?.getContext('2d')
  //   const image = imageRef.current

  //   if (!canvas || !ctx || !image) return

  //   const particles = []
  //   let imageWidth, imageHeight

  //   // Set initial canvas size
  //   canvas.width = canvasSize.width
  //   canvas.height = canvasSize.height

  //   // Image onLoad event handler to proceed once image is loaded
  //   image.onload = () => {
  //     imageWidth = image.width
  //     imageHeight = image.height

  //     // Draw image on canvas once loaded
  //     ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  //     // Create particles on hover
  //     const createParticles = (e) => {
  //       const { offsetX, offsetY } = e
  //       const particleSize = 50 // Size of each particle
  //       const rows = Math.floor(imageHeight / particleSize)
  //       const cols = Math.floor(imageWidth / particleSize)

  //       // Create particles based on the grid
  //       for (let row = 0; row < rows; row++) {
  //         for (let col = 0; col < cols; col++) {
  //           const x = col * particleSize
  //           const y = row * particleSize
  //           particles.push(new Particle(x, y, particleSize, e))
  //         }
  //       }
  //     }

  //     class Particle {
  //       constructor(x, y, size, mouseEvent) {
  //         this.x = x
  //         this.y = y
  //         this.size = size
  //         this.speedX = Math.random() * 2 - 1
  //         this.speedY = Math.random() * 2 - 1
  //         this.alpha = 1
  //         this.mouseX = mouseEvent.offsetX
  //         this.mouseY = mouseEvent.offsetY
  //         this.distance = 0
  //       }

  //       update() {
  //         // Calculate distance from the mouse pointer to the particle
  //         const dx = this.mouseX - this.x
  //         const dy = this.mouseY - this.y
  //         this.distance = Math.sqrt(dx * dx + dy * dy)

  //         // Speed up particles that are closer to the mouse
  //         const force = Math.min(10, 100 / this.distance)
  //         this.speedX += dx / force
  //         this.speedY += dy / force

  //         this.x += this.speedX
  //         this.y += this.speedY
  //         this.alpha -= 0.02
  //       }

  //       draw(ctx, img) {
  //         // Draw particle from the image grid
  //         ctx.drawImage(
  //           img,
  //           this.x,
  //           this.y,
  //           this.size,
  //           this.size,
  //           this.x,
  //           this.y,
  //           this.size,
  //           this.size
  //         )
  //         ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
  //         ctx.fill()
  //       }
  //     }

  //     // Animation loop
  //     const animate = () => {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height)
  //       ctx.drawImage(image, 0, 0, canvas.width, canvas.height) // Redraw the image for the base layer

  //       particles.forEach((particle, index) => {
  //         if (particle.alpha <= 0) {
  //           particles.splice(index, 1) // Remove particle when it's faded
  //         } else {
  //           particle.update()
  //           particle.draw(ctx, image)
  //         }
  //       })

  //       requestAnimationFrame(animate)
  //     }

  //     canvas.addEventListener('mousemove', createParticles)
  //     animate()

  //     // Cleanup event listener
  //     return () => {
  //       canvas.removeEventListener('mousemove', createParticles)
  //     }
  //   }
  // }, [canvasSize, src])

  return (
    <div className="relative w-full">
      {/* Hero section */}
      <div className="hero-container relative w-full h-[60vh] sm:h-[40vh] md:h-[60vh] lg:h-[60vh] xl:h-[60vh]">
        <Image
          src={src}
          alt={'hero'}
          fill
          className="absolute top-0 left-0 z-10"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default ParticleEffectImage
