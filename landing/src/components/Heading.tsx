import { motion } from "framer-motion";

const Heading = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-10 px-4 sm:px-6 md:px-10"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-body">
          Availr
        </h1>
        <img
          className="w-12 sm:w-14 md:w-16 invert"
          src="messenger.svg"
          alt="Messenger Logo"
        />
      </div>

      <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
        Perfect CLI tool & minimal web server for availability scheduling
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="z-10 mt-6 px-5 sm:px-6 py-2 sm:py-3 bg-white text-blue-900 font-semibold rounded-full text-sm sm:text-base"
      >
        Get Started
      </motion.button>
    </motion.header>
  );
};

export default Heading;
