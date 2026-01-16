import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder, Terminal, Cpu, Youtube, BarChart3, ScanEye } from 'lucide-react';

const projects = [
  {
    title: "JobX",
    description: "Microservices backend. Implemented an asynchronous event streaming pipeline using Apache Kafka to decouple services and ensure data consistency.",
    tech: ["Node.js", "Kafka", "PostgreSQL", "Docker"],
    github: "https://github.com/pyansu07/Job-X",
    live: null,
    icon: Cpu,
    type: "Backend Architecture"
  },
  {
    title: "TypeChamp",
    description: "Real-time multiplayer typing platform. Engineered bidirectional WebSocket pipelines (Socket.io) for low-latency keystroke synchronization between clients.",
    tech: ["React", "Socket.io", "Node.js", "Redis"],
    github: "https://github.com/pyansu07/TypeChamp_v2",
    live: "https://tc-d-frontend.onrender.com/",
    icon: Folder,
    type: "Full Stack"
  },
  {
    title: "Code Cortex",
    description: "Amazon ML Challenge (Rank 165). Pipeline combining ResNet-50 and BERT to extract entity values from images with high precision.",
    tech: ["Python", "TensorFlow", "BERT", "OCR"],
    github: "https://github.com/pyansu07/Amazon-ML-Challenge",
    live: null,
    icon: ScanEye,
    type: "AI Pipeline"
  },
  {
    title: "ProxyNova",
    description: "High-performance proxy server in C. Handles concurrent client requests via threading and implements LRU caching to optimize network packet handling.",
    tech: ["C", "Systems", "Networking", "Linux"],
    github: "https://github.com/pyansu07/ProxyNova",
    live: null,
    icon: Terminal,
    type: "Systems"
  },
  {
    title: "Profit Pulse",
    description: "Financial analytics app with ML-powered ROI prediction. Features real-time inventory optimization and visualizes business metrics.",
    tech: ["React", "Flask", "Python", "Firebase"],
    github: "https://github.com/pyansu07/Profit-Pulse",
    live: null,
    icon: BarChart3,
    type: "FinTech"
  },
  {
    title: "Nirvana (SIH)",
    description: "Enhanced low-light lunar images for Smart India Hackathon. Used CLAHE & Gamma Correction to reveal crater details in PSR regions.",
    tech: ["Python", "OpenCV", "Flask", "React"],
    github: "https://github.com/pyansu07/Nirvana",
    live: "https://youtu.be/ef7uSElfpqg?si=IQj01LfCzdmq0LpH",
    icon: Youtube,
    type: "ML / CV"
  }
];


const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-100"> <span className="text-cyan-400">03.</span> Featured Projects</h2>
          <div className="h-px bg-slate-800 flex-grow"></div>
        </div>

        {/* Changed grid to 3 columns for desktop to fit 6 items nicely */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 p-6 rounded border border-slate-800 hover:border-cyan-400/50 transition-all group flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-800/80 rounded-lg text-cyan-400 border border-slate-700">
                    <project.icon size={24} />
                </div>
                <div className="flex gap-4 text-slate-400">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors"><Github size={20} /></a>
                  {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors"><ExternalLink size={20} /></a>}
                </div>
              </div>

              <div className="mb-3">
                 <span className="text-xs font-mono text-cyan-400 mb-1 block">{project.type}</span>
                 <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                 </h3>
              </div>
              
              <p className="text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900/50">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Optional "See More" button if you have even more on GitHub */}
        <div className="mt-12 text-center">
            <a 
                href="https://github.com/pyansu07" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm border-b border-cyan-400/30 hover:border-cyan-400 transition-all pb-1"
            >
                View Full Project Archive <ExternalLink size={14} />
            </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
