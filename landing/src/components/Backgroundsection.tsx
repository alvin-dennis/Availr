const Backgroundsection = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Main Background Layer */}
      <div className="absolute w-[80vw] h-[100vh] left-0 top-0 hidden sm:block">
        <img src="/Rectangle.png" className="w-full h-full object-cover" />
      </div>

      {/* Bottom Layer */}
      <div className="absolute w-[80vw] h-[100vh] left-0 bottom-0 hidden md:block">
        <img src="/Rectangle.png" className="w-full h-full object-cover" />
      </div>

      {/* Right Overlays */}
      <div className="absolute w-[60vw] h-[100vh] right-[-20vw] bottom-0 hidden lg:block">
        <img src="/Rectangle.png" className="w-full h-full object-cover" />
      </div>

      <div className="absolute w-[60vw] h-[100vh] left-0 top-1/3 hidden lg:block">
        <img src="/Rectangle.png" className="w-full h-full object-cover" />
      </div>

      <div className="absolute w-[60vw] h-[100vh] right-[-25vw] top-1/4 hidden lg:block">
        <img src="/Rectangle.png" className="w-full h-full object-cover" />
      </div>

      {/* Accent Elements */}
      <div className="absolute w-[30vw] h-[30vw] right-[10vw] top-[55%] hidden xl:block">
        <img src="/Rectangle.png" className="w-full h-full object-cover" />
      </div>

      <div className="absolute w-[30vw] h-[30vw] right-[10vw] top-[25%] hidden xl:block">
        <img src="/Rectangle.png" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
export default Backgroundsection