import { motion } from "framer-motion";

const OAuthButtons = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        className="text-gray-400 text-sm italic"
      >
        More sign-in options coming soon...
      </motion.div>
    </div>
  );
};

export default OAuthButtons;
