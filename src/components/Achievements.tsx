import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal, LucideIcon } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  delay?: number;
  className?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  title, 
  items, 
  icon: Icon, 
  delay = 0, 
  className = "" 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.01 }}
    transition={{ 
      duration: 0.3, 
      delay,
      scale: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }}
    className={`p-6 rounded-lg shadow-xl group ${className}`}
  >
    <div className="flex items-center gap-4 mb-6">
      <Icon className="w-8 h-8 text-blue-300" />
      <h3 className="text-2xl font-semibold text-gray-100">{title}</h3>
    </div>
    <ul className="space-y-4">
      {items.map((item: string, index: number) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: delay + index * 0.1 }}
          className="flex items-start gap-3 group-hover:no-underline"
        >
          <span className="text-blue-300 mt-1">•</span>
          <span className="text-gray-200">{item}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const Achievements = () => {
  const achievements = [
    {
      title: "Competitive Programming",
      icon: Trophy,
      items: [
        "Rated in the top 10% on LeetCode",
        "3-star rating at CodeChef",
        "Achieved a rating of 1383 on Codeforces",
        "Global Rank 521 in CodeChef Starters 108 (Div-3) and Rank 845 in CodeChef Starters 115 (Div-2)",
        "Solved 400+ questions on LeetCode and Codeforces"
      ]
    },
    {
      title: "Hackathons",
      icon: Award,
      items: [
        "Secured 165th rank out of 18,720+ teams in Amazon ML Challenge 2024",
        "Finalist in the Imagen AI Hackathon organized by IIT Delhi",
        "Winner in Internal Hackathon for Smart India Hackathon"
      ]
    },
    {
      title: "Other Achievements",
      icon: Medal,
      items: [
        "Core Team Member, Coding Club of IIIT-Nagpur – Contributed to organizing coding events",
        "Core Team Member, Design Team, Tantrafiesta 2024 – Contributed to event branding and visual design"
      ]
    }
  ];

  return (
    <section id="achievements" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Achievements
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.title}
              {...achievement}
              delay={index * 0.2}
              className="relative bg-gray-800/90 hover:bg-gray-800 transition-colors duration-300 hover:shadow-lg hover:shadow-blue-400/20 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;