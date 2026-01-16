import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-cyan-400 font-mono text-lg mb-4 block">Hi, I am</span>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6">
          Pyansu Nahak.
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mb-8">
          I build scalable backends & <br />
          <span className="text-cyan-400">intelligent ML pipelines.</span>
        </h2>
        
        <p className="max-w-xl text-lg text-slate-400 mb-10 leading-relaxed">
          Software Engineer specializing in high-performance systems. 
          Currently architecting data engines at <span className="text-slate-100 font-semibold">Axory AI</span> and 
          ranking in the <span className="text-slate-100 font-semibold">top 10% on LeetCode</span>.
        </p>

        <div className="flex gap-6 items-center">
          <a 
            href="#projects" 
            className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/10 transition-colors font-mono"
          >
            Check my work
          </a>
          <div className="flex gap-4">
            <a href="https://github.com/pyansu07" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-cyan-400 transition-colors"><Github size={24} /></a>
            <a href="https://linkedin.com/in/pyansu-nahak" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-cyan-400 transition-colors"><Linkedin size={24} /></a>
            <a href="mailto:pyansu.07@gmail.com" className="p-2 hover:text-cyan-400 transition-colors"><Mail size={24} /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;