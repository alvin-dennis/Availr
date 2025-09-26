

import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-200 shadow-md py-4 px-6">
      <div className="flex items-center justify-between max-w-full mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-logo text-black drop-shadow-md font-body">
            Availr
          </h1>
          <img src="/messenger.svg" alt="Messenger" className="w-6 sm:w-8" />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex space-x-6 text-black font-mono text-sm sm:text-base">
          <a href="#about" className="hover:underline">About Availr</a>
          <a href="#tutorial" className="hover:underline">Tutorial</a>
          <a href="#knowmore" className="hover:underline">Know more</a>
          <a href="#faqs" className="hover:underline">FAQs</a>
          <a href="#contact" className="hover:underline">Contacts</a>
        </nav>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 px-2 text-black font-mono text-base">
          <a href="#about" className="block hover:underline">About Availr</a>
          <a href="#tutorial" className="block hover:underline">Tutorial</a>
          <a href="#knowmore" className="block hover:underline">Know more</a>
          <a href="#faqs" className="block hover:underline">FAQs</a>
          <a href="#contact" className="block hover:underline">Contacts</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
