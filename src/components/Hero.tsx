import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, FileDown, ExternalLink, MessageCircle, Cpu, Brain, Code, Database, Globe, Sparkles } from 'lucide-react';
import mePhoto from '../assets/images/me.jpeg';

const typingTexts = [
  'AI Instructor',
  'AI Developer',
  'Software Developer',
  'Backend Developer',
  'Tech Innovator',
];

const floatingIcons = [
  { Icon: Cpu, color: 'text-neon-blue', delay: 0, x: '10%', y: '20%' },
  { Icon: Brain, color: 'text-neon-purple', delay: 1, x: '85%', y: '15%' },
  { Icon: Code, color: 'text-neon-pink', delay: 2, x: '15%', y: '70%' },
  { Icon: Database, color: 'text-accent-400', delay: 0.5, x: '80%', y: '75%' },
  { Icon: Globe, color: 'text-primary-400', delay: 1.5, x: '50%', y: '10%' },
  { Icon: Sparkles, color: 'text-yellow-400', delay: 2.5, x: '5%', y: '45%' },
];

export default function Hero() {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), 100);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), 50);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((i) => (i + 1) % typingTexts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-gray-950 to-gray-950" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {floatingIcons.map(({ Icon, color, delay, x, y }) => (
        <motion.div
          key={delay}
          className={`absolute ${color}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, delay, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-300 border border-primary-500/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Building Intelligent Solutions{' '}
              <span className="gradient-text">With AI and Python </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              I am Samwel Edmund Oguda, an{' '}
              <span className="text-primary-300 font-medium">AI Developer</span> and{' '}
              <span className="text-primary-300 font-medium">Software Developer</span> passionate about
              Machine Learning, Django Rest Framework, FastAPI, Data Science, and intelligent systems.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 flex-wrap mb-8"
            >
              <span className="text-gray-500 font-mono text-sm">I am a</span>
              <span className="font-mono text-lg text-primary-400 min-w-[140px] text-left">
                {typingTexts[textIndex].substring(0, charIndex)}
                <span className="animate-pulse text-primary-400">|</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <button
                onClick={() => navigate('/projects')}
                className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3 glass rounded-xl text-gray-300 font-semibold transition-all duration-300 hover:bg-gray-800/60 hover:text-white hover:border-primary-500/30 hover:scale-105 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Contact Me
              </button>
              <a
                href="#"
                className="px-8 py-3 glass rounded-xl text-gray-300 font-semibold transition-all duration-300 hover:bg-gray-800/60 hover:text-white hover:border-primary-500/30 hover:scale-105 flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" /> Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                { icon: Github, href: 'https://github.com/Jteckz', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/samuel-edmund-oguda-7a4ab52a3/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:samwel@example.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-3 glass rounded-xl text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300 hover:scale-110 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center lg:justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl shadow-primary-500/10">
                <img
                  src={mePhoto}
                  alt="Samwel Edmund Oguda"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-1 rounded-3xl border border-primary-500/10 group-hover:border-primary-500/30 transition-colors duration-500" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => navigate('/about')}
            className="text-gray-500 hover:text-gray-300 transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
