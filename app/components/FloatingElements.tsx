// src/components/FloatingElements.tsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const emojis = ['💛', '✨', '🌙', '💖', '🐶', 'Coldplay'];

const FloatingElements = () => {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (30 - 15) + 15,
      delay: Math.random() * 5,
      duration: Math.random() * (10 - 5) + 5,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-romantic-yellow opacity-40 select-none"
          style={{ 
            left: `${el.x}%`, 
            top: `${el.y}%`, 
            fontSize: `${el.size}px` 
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            y: [-20, -120],
            x: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;