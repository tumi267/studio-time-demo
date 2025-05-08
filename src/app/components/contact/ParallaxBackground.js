'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ParallaxBackground() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollValue = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollValue * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 h-[150vh]">
      <div 
        ref={parallaxRef}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src="/images/contact-bg.jpg"
          alt="Studio background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
    </div>
  );
}