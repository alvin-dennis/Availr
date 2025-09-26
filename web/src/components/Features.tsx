import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
}

const Features = ({ title, description }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-10 px-4 sm:px-6 md:px-10  mx-auto"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">
        {title}
      </h2>
      <p className="text-base sm:text-lg md:text-xl mb-6 text-center text-white/90">
        {description}
      </p>
      <ul className="list-none space-y-4 bg-white/10 p-4 sm:p-6 md:p-8 rounded-xl backdrop-blur-sm text-white text-sm sm:text-base md:text-lg leading-relaxed">
        <li>
          ✅ <b>Email-Based Confirmation Workflow</b> – Send availability invites with ease
        </li>
        <li>
          📥 <b>CSV Import</b> – Upload attendee lists instantly
        </li>
        <li>
          🔗 <b>Personalized Links</b> – One-click confirmations, no login needed
        </li>
        <li>
          🌐 <b>Secure Hosted Pages</b> – Privacy-respecting and lightweight
        </li>
        <li>
          🧹 <b>Auto Cleanup</b> – Keep your data tidy and up-to-date
        </li>
        <li>
          👥 <b>Multi-Tenant Ready</b> – Perfect for teams, bootcamps, and more
        </li>
      </ul>
    </motion.section>
  );
};

export default Features;
