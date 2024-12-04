import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon?: string;
}

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  delay?: number;
  className?: string;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.3, 
      delay,
    }}
    className={`p-6 rounded-lg shadow-xl ${className}`}
  >
    <h3 className="text-xl font-semibold mb-4 text-blue-400">{title}</h3>
    <div className="flex flex-wrap gap-4">
      {skills.map((skill: Skill, index: number) => (
        <div key={index} className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-full">
          {skill.icon && (
            <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}`} 
                 alt={skill.name}
                 className="w-5 h-5" />
          )}
          <span className="text-gray-200">{skill.name}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "C++", icon: "cplusplus/cplusplus-original.svg" },
        { name: "Python", icon: "python/python-original.svg" },
        { name: "PHP", icon: "php/php-original.svg" },
        { name: "JavaScript", icon: "javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "typescript/typescript-original.svg" },
        { name: "HTML", icon: "html5/html5-original.svg" },
        { name: "CSS", icon: "css3/css3-original.svg" },
        { name: "SQL", icon: "mysql/mysql-original.svg" }
      ]
    },
    {
      title: "Technologies/Frameworks",
      skills: [
        { name: "React", icon: "react/react-original.svg" },
        { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
        { name: "Express", icon: "express/express-original.svg" },
        { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
        { name: "Redis", icon: "redis/redis-original.svg" },
        { name: "Next.js", icon: "nextjs/nextjs-original.svg" }
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: "git/git-original.svg" },
        { name: "GitHub", icon: "github/github-original.svg" },
        { name: "Linux", icon: "linux/linux-original.svg" },
        { name: "MySQL", icon: "mysql/mysql-original.svg" },
        { name: "Android Studio", icon: "android/android-original.svg" },
        { name: "PyCharm", icon: "pycharm/pycharm-original.svg" },
        { name: "Postman", icon: "postman/postman-original.svg" }
      ]
    },
    {
      title: "Fundamentals",
      skills: [
        { name: "OOP", icon: "java/java-original.svg" },
        { name: "DSA", icon: "cplusplus/cplusplus-original.svg" },
        { name: "Computer Networks" },
        { name: "Operating Systems" },
        { name: "DBMS" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              delay={index * 0.1}
              className="group relative backdrop-blur-lg bg-gray-800/90 hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;