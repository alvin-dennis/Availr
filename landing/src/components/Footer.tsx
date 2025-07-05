const Footer = () => {
  return (
    <footer className="text-white px-4 sm:px-6 md:px-10 py-10 text-sm bg-white/10 rounded-lg mx-auto">
      {/* Top Footer Content */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Column 1: Availr Description */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Availr</h3>
          <p className="mb-3">
            Type-safe, modern TypeScript scaffolding for full stack web development
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="GitHub">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
                className="invert size-7"
              />
            </a>
            <a href="#" aria-label="NPM">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg"
                alt="NPM"
                className="invert size-7"
              />
            </a>
          </div>
        </div>

        {/* Column 2: Resources */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">GitHub Repository</a></li>
            <li><a href="#" className="hover:underline">NPM Package</a></li>
            <li><a href="#" className="hover:underline">Demo Application</a></li>
          </ul>
        </div>

        {/* Column 3: Contacts */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Contacts</h3>
          <p>abc.xyz@gmail.com</p>
          <p>Have questions or feedback?</p>
          <p>
            Feel free to reach out on{" "}
            <a href="#" className="underline">GitHub</a>
          </p>
        </div>
      </div>

      {/* Divider and Bottom Note */}
      <div className="border-t border-white/10 mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-center gap-2">
        <p>© 2025 Availr. All rights reserved.</p>
        <p>Built with TypeScript</p>
      </div>
    </footer>
  );
};

export default Footer;
