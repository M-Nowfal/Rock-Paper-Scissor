// components/CrackersEffect.tsx
import { motion } from 'framer-motion';

const CrackersEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
            opacity: 1,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, (Math.random() - 0.5) * 200],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            times: [0, 0.5, 1],
          }}
        >
          🎉
        </motion.div>
      ))}
    </div>
  );
};

export default CrackersEffect;