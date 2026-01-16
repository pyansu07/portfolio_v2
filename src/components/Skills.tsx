import { motion } from 'framer-motion';

const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "C++", "SQL", "PHP"],
  Frontend: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express.js", "Flask", "Fast API", "Apollo Server"],
  "Cloud & DevOps": ["Docker", "Kafka", "Redis", "AWS", "Git/GitHub"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"]
};

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-slate-100"> <span className="text-cyan-400">03.</span> Technical Skills</h2>
        <div className="h-px bg-slate-800 flex-grow"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, items], idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-900/50 p-6 rounded border border-slate-800/50"
          >
            <h3 className="text-cyan-400 font-mono mb-4 text-lg">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, i) => (
                <span key={i} className="text-slate-400 text-sm hover:text-slate-200 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;