import { motion } from 'framer-motion';
import profileImage from '../icons/profile.jpeg';
const About = () => {

  return (
    <section id="about" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <motion.div
            className="md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img
                src={profileImage}
                alt="Developer"
                className="rounded-lg shadow-2xl w-full relative z-10"
              />
            </div>
          </motion.div>

          {/* About Details */}
          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              I am currently a 3rd-year undergraduate student at IIIT Nagpur, passionate about competitive programming and problem-solving. I have solid experience with data structures and algorithms in C++ and have also explored various aspects of web development and machine learning. Additionally, I've dabbled in data science, broadening my technical expertise and adding to my versatile skill set. Explore my portfolio to see my work in action.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;