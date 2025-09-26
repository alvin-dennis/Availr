import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
}

const Usage = ({ title, description }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-10 px-4 sm:px-6 md:px-10 mx-auto text-white"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center sm:text-left">
        {title}
      </h2>
      <p className="text-base sm:text-lg md:text-xl mb-6 text-white/90 text-center sm:text-left">
        {description}
      </p>
      <ul className="list-none space-y-3 bg-white/10 p-4 sm:p-6 rounded-lg text-base sm:text-lg md:text-xl leading-relaxed text-white/90">
        <li>💻 Tech Bootcamps</li>
        <li>📚 Workshops & Trainings</li>
        <li>🎤 Interviews</li>
        <li>👨‍💻 Hackathons & Developer Events</li>
      </ul>
    </motion.section>
  );
};

export default Usage;
