import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 selection:bg-cyan-500/30 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />        {/* Intro / Hook */}
        <About />       {/* Combined Experience & Education */}
        <Skills />      {/* Tech Stack */}
        <Projects />    {/* Your 4 Projects */}
        <Achievements />{/* Amazon ML Rank, LeetCode */}
        <Contact />     {/* Footer */}
      </main>
    </div>
  );
}
export default App;