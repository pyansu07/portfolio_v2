import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-cyan-400 font-mono mb-4">05. What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">Get In Touch</h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
          I am currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
        </p>
        <a 
          href="mailto:pyansu.07@gmail.com"
          className="px-8 py-4 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/10 transition-colors font-mono inline-block"
        >
          Say Hello
        </a>
      </motion.div>

      <footer className="mt-20 text-slate-600 text-sm font-mono">
        <p>Designed & Built by Pyansu Nahak</p>
      </footer>
    </section>
  );
};

export default Contact;
