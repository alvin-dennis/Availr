import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const faqs = [
  "Is Availr free to use?",
  "Where is my data stored?",
  "Can I use my own domain?",
];

const FAQ = () => {
  return (
    <motion.section
      className="text-white px-4 sm:px-6 md:px-12 py-12 space-y-6 mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center">
        Frequently Asked Questions:
      </h2>

      <div className="space-y-5">
        {faqs.map((q, i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="overflow-hidden bg-white/10 rounded-xl px-4 sm:px-6 py-4 backdrop-blur-sm cursor-pointer group transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base md:text-lg font-medium group-hover:tracking-wide transition-all">
                {q}
              </span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              >
                <ArrowRight className="opacity-80 w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FAQ;
