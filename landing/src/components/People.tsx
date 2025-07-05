import { motion } from "framer-motion";

const main = [
  {
    text: "A must-have for fast RSVP collection. Made my workshop planning so much easier.",
    author: "Anjali M., Bootcamp Organizer",
  },
  {
    text: "Clean, simple, and it just works. Saved me hours.",
    author: "Kiran R., Tech Lead",
  },
  {
    text: "Scheduling interviews used to be a nightmare. Now it's a breeze with Availr.",
    author: "Naveen J., HR Manager",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const People = () => {
  return (
    <motion.section
      className="text-white py-12 px-4 sm:px-6 md:px-10 mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {main.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white/5 p-6 sm:p-6 md:p-8 rounded-xl shadow-sm backdrop-blur-md transition-transform duration-300 group cursor-pointer"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <p className="italic text-sm sm:text-base text-white/90 group-hover:text-white transition-colors duration-300">
              “{item.text}”
            </p>
            <p className="mt-4 text-right font-semibold text-white/80 group-hover:text-white text-sm sm:text-base">
              – {item.author}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default People;
