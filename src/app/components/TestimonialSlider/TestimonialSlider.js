'use client'
import { motion, useAnimation } from 'framer-motion';
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from 'react';

const StudioTestimonialsSlider = () => {
  const testimonials = [
    {
      text: "The studio's acoustics are phenomenal - it brings out the best in our recordings. Worth every penny!",
      author: "Alex Turner",
      role: "Music Producer",
   
    },
    {
      text: "As a voice actor, I've worked in many studios. This one stands out for its professional atmosphere and top-notch equipment.",
      author: "Maria Garcia",
      role: "Voice Actor",
   
    },
    {
      text: "Our band recorded our debut album here. The sound engineers are magicians with the mixing board!",
      author: "Jamie Smith",
      role: "Band Leader",
 
    },
    {
      text: "The isolation booths are perfect for podcast recording. Super clean audio with no post-production needed.",
      author: "Ryan Choi",
      role: "Podcast Host",
  
    },
    {
      text: "I've been coming here for years. The staff knows exactly how to get the perfect sound for audiobooks.",
      author: "Sophie Martin",
      role: "Narrator",
    
    },
  ];
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative bg-gray-800 py-16 font-montserrat overflow-hidden">
      <h2 className="text-4xl font-semibold text-center text-white mb-8">
        What Our Clients Are Saying
      </h2>

      <div className="w-[88%] mx-auto overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={controls}
          initial={{
            x: ["0%", "-100%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div
              key={`${index}-${testimonial.author}`}
              className="flex-shrink-0 w-[calc(25%)]"
              onHoverStart={() => {
                setHoveredIndex(index);
                controls.stop();
              }}
              onHoverEnd={() => {
                setHoveredIndex(null);
                controls.start({
                  x: ["0%", "-100%"],
                  transition: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  }
                });
              }}
              animate={{
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="p-8 bg-gray-700 text-white rounded-xl shadow-xl h-full min-w-[300px]">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <p className="italic">{testimonial.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
export default StudioTestimonialsSlider;
