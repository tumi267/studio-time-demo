'use client'
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const StudioTestimonialsSliderAdmin = () => {
  const [testimonials, setTestimonials] = useState([
    { text: "The studio's acoustics are phenomenal - it brings out the best in our recordings.", author: "Alex Turner", role: "Music Producer" },
    { text: "This one stands out for its professional atmosphere and top-notch equipment.", author: "Maria Garcia", role: "Voice Actor" },
    { text: "The sound engineers are magicians with the mixing board!", author: "Jamie Smith", role: "Band Leader" },
  ]);

  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [animationSpeed, setAnimationSpeed] = useState(30);

  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative bg-gray-800 py-16 font-montserrat overflow-hidden">
      <h2 className="text-4xl font-semibold text-center text-white mb-8">
        What Our Clients Are Saying
      </h2>

      {/* Speed Controller */}
      <div className="flex justify-center items-center gap-4 mb-10 text-white">
        <label>Speed:</label>
        <input
          type="range"
          min="5"
          max="60"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
          className="w-1/3"
        />
        <span>{animationSpeed}s</span>
        <p>hover over to start animation</p>
      </div>

      {/* Add New Testimonial */}
      <div className="w-[88%] mx-auto mb-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input placeholder="Author" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
          <Textarea placeholder="Testimonial" value={newText} onChange={(e) => setNewText(e.target.value)} />
          <Button onClick={() => {
            // logic to add
            if (newAuthor && newText) {
              setTestimonials([...testimonials, { author: newAuthor, text: newText }]);
              setNewAuthor('');
              setNewText('');
            }
          }}>
            Add Review
          </Button>
        </div>
      </div>

      {/* Auto-scrolling testimonials */}
      <div className="w-[88%] mx-auto overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={controls}
          initial={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: animationSpeed,
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
                    duration: animationSpeed,
                    ease: "linear",
                  }
                });
              }}
              animate={{
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="p-8 bg-gray-700 text-white rounded-xl shadow-xl h-full min-w-[300px] relative">
                <Button
                  className="absolute top-2 right-2 text-xs p-1"
                  variant="destructive"
                  onClick={() => {
                    const actualIndex = index % testimonials.length;
                    setTestimonials(testimonials.filter((_, i) => i !== actualIndex));
                  }}
                >
                  Delete
                </Button>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-xs">{testimonial.role}</p>
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

export default StudioTestimonialsSliderAdmin;
