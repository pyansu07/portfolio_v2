import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import i1 from '../icons/tc.png';
import i2 from '../icons/kora.png';
import i3 from '../icons/aa.png';
import i4 from '../icons/nir.png';
import i5 from '../icons/proxy-server-1.jpeg';
import i6 from '../icons/x.png';
type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'ml';

interface BaseProject {
  title: string;
  description: string;
  github: string;
  tags: string[];
}

interface MainProject extends BaseProject {
  image: string;
  demo?: string;
}

interface FilteredProject extends BaseProject {
  demo?: string;
}

const Projects = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | null>(null);

  const projects: MainProject[] = [
    {
      title: 'TypeChamp',
      description: 'A real-time multiplayer typing game where players compete in typing challenges, with a chat feature for interacting with opponents during matches.',
      image: i1,
      github: 'https://github.com/pyansu07/TypeChamp_v2',
      demo: 'https://tc-d-frontend.onrender.com/',
      tags: ['REACT', 'JAVASCRIPT', 'Web-Sockets', 'CSS']
    },
    {
      title: 'Kora',
      description: 'A beautifully designed SaaS landing page featuring a modern UI, built with Next.js, Tailwind CSS and ShadCN UI',
      image: i2,
      github: 'https://github.com/pyansu07/kora',
      demo: 'https://koraai.vercel.app/',
      tags: ['NEXT.JS', 'TAILWIND', 'SHADCN']
    },
    {
      title: 'AttireAura',
      description: 'A modern clothing store web application that offers a seamless shopping experience. It features advanced product filtering, integrated customer support via a chatbot.',
      image: i3,
      github: 'https://github.com/pyansu07/AttireAura',
      tags: ['MERN', 'Stripe', 'RESTful APIs']
    },
    {
      title: 'Nirvana',
      description: 'An SIH project aimed at enhancing the images of the PSR on the Moon, by utilizing advanced image processing techniques',
      image: i4,
      github: 'https://github.com/pyansu07/Nirvana',
      demo: 'https://youtu.be/ef7uSElfpqg?si=IQj01LfCzdmq0LpH',
      tags: ['REACT', 'FLASK', 'PYTHON']
    },
    {
      title: 'ProxyNova',
      description: 'A high-performance proxy server developed in C. It efficiently handles client requests sequentially and caches responses to optimize network performance, enhancing speed and reducing latency for end-users.',
      image: i5,
      github: 'https://github.com/pyansu07/ProxyNova',
      tags: ['C', 'Socket Programming', 'Computer Networking']
    },
    {
      title: 'X-Bot',
      description: 'This Twitter Bot automatically tweets on a schedule using Node.js, the Twitter API, and cron jobs.',
      image: i6,
      github: 'https://github.com/pyansu07/Twitter-Bot',
      tags: ['Javascript','Node.js', 'TWITTER API']
    },
  ];

  // Additional projects organized by category
  const filteredProjects: Record<ProjectCategory, FilteredProject[]> = {
    frontend: [
      {
        title: 'Portfolio 1.0',
        description: 'Personal portfolio website',
        github: 'https://github.com/pyansu07/Portfolio',
        demo: 'https://pyansu07.github.io/Portfolio/',
        tags: ['REACT']
      },
      {
        title: 'Portfolio 2.0',
        description: 'Personal portfolio website',
        github: 'https://github.com/pyansu07/portfolio_v2',
        demo: 'https://pyansu-nahak.vercel.app/',
        tags: ['REACT', 'TAILWIND']
      }
    ],
    backend: [
      {
        title: 'TCP Server',
        description: 'This project demonstrates how to build a basic TCP server in C, covering concepts like three-way handshake.',
        github: 'https://github.com/pyansu07/TCP_Server',
        tags: ['C']
      }
    ],
    fullstack: [
      {
        title: 'EmployEase',
        description: 'Full-stack Employee Management System, showcasing core OOP principles like encapsulation, inheritance, abstraction, and polymorphism.',
        github: 'https://github.com/yourusername/blog',
        tags: ['Java', 'Spring Boot', 'React']
      },
      {
        title: 'Profit-Pulse',
        description: 'This is a full-stack application designed to calculate the profit of a seller based on sales and remaining stock.',
        github: 'https://github.com/pyansu07/Profit-Pulse',
        tags: ['REACT', 'FLASK', 'PYTHON']
      },
      {
        title: 'TrackTube',
        description: 'A Chrome extension that shows your last 5 watched YouTube videos directly from your browser.',
        github: 'https://github.com/pyansu07/TrackTube',
        tags: ['Javascript']
      }
    ],
    ml: [
      {
        title: 'Amazon-ML-Challenge',
        description: 'Designed a pipeline to extract product dimensions (width, height, depth) and weight using OCR.',
        github: 'https://github.com/pyansu07/Amazon-ML-Challenge',
        tags: ['PYTHON', 'OCR']
      },
      {
        title: 'EstateInsight',
        description: 'Predic price of a house based on features like location, area, etc.',
        github: 'https://github.com/pyansu07/EstateInsight',
        tags: ['PYTHON','TENSORFLOW']
      },
      {
        title: 'ML_Classify',
        description: 'Image classification.',
        github: 'https://github.com/pyansu07/ML_Classify',
        tags: ['PYTHON', 'TENSORFLOW']
      }
    ]
  };

  return (
    <section id="projects" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-800/90 rounded-lg shadow-xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-0.5 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: getTagColor(tag),
                        color: 'white'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <motion.button
            className="px-8 py-3 text-lg text-white bg-gray-800/50 rounded-lg backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 hover:shadow-lg"
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Other Projects
          </motion.button>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 flex-wrap justify-center"
            >
              {['Frontend', 'Backend', 'Full Stack', 'ML'].map((filter) => (
                <motion.button
                  key={filter}
                  className={`px-6 py-2 text-gray-300 bg-gray-800/50 rounded-lg backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 
                    ${activeFilter === filter.toLowerCase().replace(' ', '') ? 'ring-2 ring-blue-500' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const category = filter.toLowerCase().replace(' ', '') as ProjectCategory;
                    setActiveFilter(activeFilter === category ? null : category);
                  }}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Filtered Projects */}
          <AnimatePresence mode="wait">
            {activeFilter && (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8"
              >
                {filteredProjects[activeFilter].map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative bg-gray-800/90 rounded-lg shadow-xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-0.5 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: getTagColor(tag),
                              color: 'white'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          Code
                        </a>
                        {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Demo
                    </a>
                  )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Helper function to get tag colors
const getTagColor = (tag: string): string => {
  const colors: { [key: string]: string } = {
    // Languages & Core Technologies
    REACT: '#61DAFB',  // React Blue
    JAVASCRIPT: '#F7DF1E',  // JavaScript Yellow
    PYTHON: '#3776AB',  // Python Blue
    'C': '#A8B9CC',  // C Gray-Blue
    JAVA: '#007396',  // Java Blue

    // Frameworks & Libraries
    'NEXT.JS': '#000000',  // Next.js Black
    FLASK: '#000000',  // Flask Black
    TAILWIND: '#06B6D4',  // Tailwind Cyan
    SHADCN: '#000000',  // ShadCN Black
    
    // Databases & Backend
    MONGODB: '#47A248',  // MongoDB Green
    'Web-Sockets': '#010101',  // WebSocket Black
    'Socket Programming': '#4B5563',  // Socket Gray
    
    // APIs & Services
    'TWITTER API': '#1DA1F2',  // Twitter Blue
    OCR: '#FF6B6B',  // OCR Red
    TENSORFLOW: '#FF6F00',  // TensorFlow Orange
    
    // Tools & Others
    CSS: '#1572B6',  // CSS Blue
    MERN: '#00ED64',  // MERN Green
    'Computer Networking': '#4B5563',  // Networking Gray
    'RESTful APIs': '#FF4154',  // REST Red
    Stripe: '#008CDD',  // Stripe Blue
  };
  
  // Return the color if it exists, otherwise return a default gray
  return colors[tag] || '#4B5563';
};

export default Projects;
