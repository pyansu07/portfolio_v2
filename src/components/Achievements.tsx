import { motion } from 'framer-motion';
import { Trophy, Award, Users, Star } from 'lucide-react';

const technical = [
  {
    title: "Amazon ML Challenge 2024",
    desc: "Rank 165 out of 18,720+ teams globally",
    icon: Trophy,
    color: "text-yellow-400"
  },
  {
    title: "Smart India Hackathon (Internal)",
    desc: "Winner - Selected for the national round",
    icon: Award,
    color: "text-purple-400"
  },
  {
    title: "LeetCode & Codeforces",
    desc: "Top 10% (Rating 1745) | Global Rank 2,179 (CF)",
    icon: Star,
    color: "text-orange-400"
  }
];

const leadership = [
  {
    role: "Core Team Member",
    org: "Coding Club, IIIT Nagpur",
    desc: "Organized coding events and workshops for 500+ students."
  },
  {
    role: "Design Team Core",
    org: "Tantrafiesta 2024",
    desc: "Led visual branding for the annual national tech fest."
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-slate-100"> <span className="text-cyan-400">04.</span> Achievements</h2>
        <div className="h-px bg-slate-800 flex-grow"></div>
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-8">
        
        {/* Technical Wins */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                <Trophy className="text-cyan-400" size={20}/> Competitions
            </h3>
            {technical.map((item, idx) => (
                <motion.div 
                    key={idx}
                    whileHover={{ x: 5 }}
                    className="bg-slate-900/50 p-6 rounded border border-slate-800 flex items-start gap-4"
                >
                    <div className={`p-2 bg-slate-800 rounded-full ${item.color}`}>
                        <item.icon size={20} />
                    </div>
                    <div>
                        <h4 className="text-slate-100 font-bold text-lg">{item.title}</h4>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Leadership */}
        <div className="space-y-4">
             <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                <Users className="text-cyan-400" size={20}/> Leadership
            </h3>
            {leadership.map((item, idx) => (
                <div key={idx} className="bg-slate-900/30 p-6 rounded border border-slate-800/50">
                    <h4 className="text-cyan-400 font-bold">{item.role}</h4>
                    <p className="text-slate-100 text-sm mb-2">{item.org}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;