import Heading from './components/Heading';
import ProblemStatement from './components/ps';
import Features from './components/Features';
import Working from './components/Working';
import Help from './components/Help';
import Usage from './components/Usage';
import People from './components/People';
import FAQ from './components/Faq';
import Prefooter from './components/Prefooter';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#003897] to-black min-h-screen font-sans text-white overflow-x-hidden">
      <div className="z-10">
        <Navbar />

        <div className="bg-gradient-to-b from-blue-600 to-black text-white font-sans">
          <div className="bg-[url(/Rectangle.png)] bg-center bg-repeat bg-size-[100px]">
            <Heading />

            <main className="px-4 sm:px-6 md:px-10 py-12 w-full max-w-6xl mx-auto space-y-16">
              <ProblemStatement
                title="Tired of Chasing Confirmations?"
                description="Too many emails. Too many delays. One missed reply can throw everything off. Manual scheduling is like herding cats — slow, messy, and frustrating. Availr makes it smooth, smart, and stress-free — and it starts here."
              />

              <section id="about">
                <Features
                  title="How Availr Helps?"
                  description="One Tool. Total Control."
                />
              </section>

              <section id="tutorial">
                <Working
                  title="Here’s How Availr Works?"
                  description="Visual Journey:"
                />
              </section>

              <section id="knowmore">
                <Help
                  title="Why Teams Love Availr?"
                  description="What Sets Us Apart:"
                />
              </section>

              <Usage
                title="Built for Every Kind of Scheduling"
                description="Where Availr Shines:"
              />

              <People />

              <section id="faqs">
                <FAQ />
              </section>

              <Prefooter />

              <section id="contact">
                <Footer />
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
