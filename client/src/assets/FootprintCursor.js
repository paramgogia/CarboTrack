import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FootprintCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [footprints, setFootprints] = useState([]);
  const [isLeftFoot, setIsLeftFoot] = useState(true);
  const inactivityTimeoutRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Clear previous timeout and reset it
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      inactivityTimeoutRef.current = setTimeout(() => {
        setFootprints([]); // Clear footprints after inactivity
      }, 1000); // Adjust timeout duration as needed (e.g., 2000ms = 2 seconds)

      // Add new footprint every 60px of movement
      const lastFootprint = footprints[footprints.length - 1];
      if (
        !lastFootprint ||
        Math.hypot(e.clientX - lastFootprint.x, e.clientY - lastFootprint.y) > 60
      ) {
        const newFootprint = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          isLeft: isLeftFoot,
          rotation:
            Math.atan2(
              e.clientY - (lastFootprint?.y || e.clientY),
              e.clientX - (lastFootprint?.x || e.clientX)
            ) *
            (180 / Math.PI)
        };

        setFootprints((prev) => [...prev.slice(-15), newFootprint]);
        setIsLeftFoot(!isLeftFoot);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearTimeout(inactivityTimeoutRef.current); // Cleanup timer on component unmount
    };
  }, [footprints, isLeftFoot]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {footprints.map((footprint, index) => (
          <motion.div
            key={footprint.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: [1, 0.8, 0.6, 0.4, 0.2], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: footprint.x - 15,
              top: footprint.y - 15,
              transform: `rotate(${footprint.rotation}deg) scaleX(${footprint.isLeft ? 1 : -1})`
            }}
          >
            <svg
              width="30"
              height="40"
              viewBox="0 0 100 100"
              className={`transition-colors duration-300`}
              style={{
                fill:
                  index < 5
                    ? 'grgb(68, 92, 122)'
                    : index < 10
                    ? 'rgb(34, 197, 94)'
                    : 'rgb(58, 220, 118)'
              }}
            >
              {/* Adjusted footprint shape for better clarity */}
              <path d="M50,0 C60,0 70,10 75,25 C80,40 80,50 75,65 C70,80 60,90 50,100 C40,90 30,80 25,65 C20,50 20,40 25,25 C30,10 40,0 50,0 Z" />
              <circle cx="35" cy="25" r="5" /> {/* Toe */}
              <circle cx="65" cy="25" r="5" /> {/* Toe */}
              <circle cx="50" cy="10" r="5" /> {/* Toe */}
              <circle cx="40" cy="35" r="6" /> {/* Toe */}
              <circle cx="60" cy="35" r="6" /> {/* Toe */}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FootprintCursor;
