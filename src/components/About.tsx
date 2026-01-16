import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, School, Star } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-100"> <span className="text-cyan-400">01.</span> My Journey</h2>
          <div className="h-px bg-slate-800 flex-grow"></div>
        </div>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-12">
          {/* Experience Column */}
          <div className="space-y-12">
            <h3 className="text-xl font-mono text-cyan-400 mb-8 flex items-center gap-2">
              <Briefcase size={20} /> Work Experience
            </h3>

            <div className="relative border-l-2 border-slate-800 pl-8 ml-3 space-y-12">
              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></span>
                <h4 className="text-2xl font-bold text-slate-100">Software Engineering Intern</h4>
                <p className="text-cyan-400 font-mono mb-2">Axory AI • Remote</p>
                <p className="text-slate-500 text-sm font-mono mb-4">Sep 2025 - Present</p>
                
                <ul className="space-y-3 text-slate-400 leading-relaxed list-disc list-outside ml-4">
                  <li>
                    <span className="text-slate-200">Architected a high-performance Python data engine</span> using Multi-threaded Producer-Consumer models, increasing throughput by <span className="text-cyan-400">92%</span>.
                  </li>
                  <li>
                    Engineered a resilient backend with thread-safe Lock primitives, ensuring 100% data integrity and 24/7 uptime.
                  </li>
                  <li>
                    Bypassed API pagination limits using a custom "Keyword Slicing" algorithm to harvest <span className="text-slate-200">60,000+ unique samples</span>.
                  </li>
                  <li>
                    Optimized Core Web Vitals using React.js & TypeScript lazy loading.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div>
             <h3 className="text-xl font-mono text-cyan-400 mb-8 flex items-center gap-2">
              <GraduationCap size={20} /> Education
            </h3>
            
            <div className="space-y-8">
              {/* College */}
              <div className="bg-slate-900/50 p-6 rounded border border-slate-800 hover:border-cyan-400/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                   <h4 className="text-lg font-bold text-slate-100">IIIT Nagpur</h4>
                   <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">2022-2026</span>
                </div>
                <p className="text-slate-400 text-sm mb-3">B.Tech</p>
                    <span>Top 4% in JEE</span>
              </div>

              {/* Schools */}
              <div className="bg-slate-900/50 p-6 rounded border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                    <School size={18} className="text-cyan-400"/>
                    <h4 className="text-slate-100 font-bold">Schooling</h4>
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Class XII</span>
                        <span className="text-cyan-400 font-mono font-bold">96%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Class X</span>
                        <span className="text-cyan-400 font-mono font-bold">94%</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;