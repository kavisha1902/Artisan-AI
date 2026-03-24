import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DoodleCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function DoodleCard({ children, className = '', hover = true }: DoodleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`bg-white rounded-xl p-6 shadow-sm ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}
      style={{
        border: '2px solid transparent',
        background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #4CAF50, #66BB6A) border-box',
      }}
    >
      {children}
    </motion.div>
  );
}

