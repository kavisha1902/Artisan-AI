import { motion } from 'framer-motion';

const doodles = ['✨', '🌟', '☁️', '🌸', '🎨', '⭐', '💫'];

export default function FloatingDoodles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {doodles.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}

