import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';

// Subtle film grain to add depth over the flat dark background.
const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/></svg>";

function App() {
  return (
    <div className="relative min-h-screen bg-ink text-slate-300 font-sans overflow-x-hidden">
      {/* Ambient background layers */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-grid" />
        {/* Aurora glows */}
        <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-cyan-500/20 blur-[130px] animate-float-slow" />
        <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-blue-600/20 blur-[130px] animate-float" />
        <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[120px]" />
        {/* Vignette to keep text crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      </div>

      {/* Film grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />

      <Header />

      <main className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <Hero />
      </main>

      {/* Full-bleed tech ticker */}
      <div className="border-y border-slate-800/50 bg-slate-950/30">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <Marquee />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <BackToTop />
    </div>
  );
}

export default App;
