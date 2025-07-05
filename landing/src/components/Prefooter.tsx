import { motion } from "framer-motion";

const Prefooter = () => {
  return (
    <motion.section
      className="text-white text-center px-4 sm:px-6 md:px-10 py-12  mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Ready to Save Hours of Work?
      </h2>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90">
        Ditch endless email threads and clunky forms — let <span className="font-semibold text-white">Availr</span> handle the heavy lifting.
      </p>
    </motion.section>
  );
};

export default Prefooter;
