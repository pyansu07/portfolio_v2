import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    // `reducedMotion="user"` makes every motion component below drop transform
    // and layout animations (keeping opacity) when the OS asks for it.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-ink">
        <Header />

        {/* Narrow single measure on mobile; on desktop the shell widens so the
            hero can go two-column and the grids get real room. Text-heavy
            sections cap themselves back down so the reading measure stays sane. */}
        <main className="mx-auto w-full max-w-2xl flex-grow px-6 sm:px-8 xl:max-w-6xl xl:px-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}

export default App;
