import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;