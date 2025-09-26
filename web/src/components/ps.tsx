import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
}

const ProblemStatement = ({ title, description }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-4 sm:px-6 md:px-10 py-8 mx-auto text-white"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center sm:text-left">
        {title}
      </h2>
      <p className="text-base sm:text-lg md:text-xl bg-white/10 p-4 sm:p-6 rounded-lg leading-relaxed text-white/90 text-center sm:text-left">
        {description}
      </p>
    </motion.section>
  );
};

export default ProblemStatement;
