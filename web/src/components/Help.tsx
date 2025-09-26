import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
}

const Help = ({ title, description }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-10 px-4 sm:px-6 md:px-10 mx-auto"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center sm:text-left">
        {title}
      </h2>
      <p className="text-base sm:text-lg md:text-xl mb-6 text-white/90 text-center sm:text-left">
        {description}
      </p>
      <ul className="list-none space-y-3 bg-white/10 p-4 sm:p-6 md:p-8 rounded-xl backdrop-blur-sm text-white text-sm sm:text-base md:text-lg leading-relaxed">
        <li>✨ <b>No account or login</b> needed for participants</li>
        <li>⚙️ <b>CLI-first workflow</b> — made for developers and organizers</li>
        <li>📈 <b>Scales effortlessly</b> — from 10 to 10,000 users</li>
        <li>🛡️ <b>Built with privacy</b> in mind — no unnecessary data collection</li>
      </ul>
    </motion.section>
  );
};

export default Help;
