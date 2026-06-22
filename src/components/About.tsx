import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Cpu, Sprout, Rocket, Users } from 'lucide-react';

const stats = [
  { icon: Code2, value: '3+', label: 'Years Coding' },
  { icon: Brain, value: '20+', label: 'AI/ML Projects' },
  { icon: Rocket, value: '10+', label: 'Flask APIs' },
  { icon: Users, value: '5+', label: 'Startup Ideas' },
];

const highlights = [
  {
    icon: Brain,
    title: 'AI Developer',
    description: 'Building intelligent systems with machine learning and deep learning solutions.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cpu,
    title: 'ML Engineer',
    description: 'Experienced in data preprocessing, model training, and deployment of ML models.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code2,
    title: 'Backend Engineer',
    description: 'Designing robust APIs and backend systems using Flask, Node.js, and databases.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Sprout,
    title: 'AgriTech Innovator',
    description: 'Passionate about leveraging technology to solve agricultural challenges.',
    color: 'from-amber-500 to-orange-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about creating intelligent solutions that make a difference
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div variants={itemVariants} className="card p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Who I Am
            </h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm <span className="text-white font-medium">Samwel Edmund Oguda</span>, an AI Developer
                and Machine Learning Engineer with a deep passion for building intelligent systems
                that solve real-world problems.
              </p>
              <p>
                My journey in tech spans across <span className="text-primary-300">artificial intelligence</span>,
                <span className="text-primary-300"> backend engineering</span>, and
                <span className="text-primary-300"> agricultural technology</span> — where I apply
                practical AI solutions to transform traditional industries.
              </p>
              <p>
                From developing ML models for predictive analytics to building scalable Flask APIs,
                I thrive at the intersection of <span className="text-accent-300">innovation</span> and
                <span className="text-accent-300"> practical implementation</span>.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: 'AI/ML', value: 'Expert' },
                { label: 'Python', value: 'Advanced' },
                { label: 'Flask', value: 'Advanced' },
                { label: 'Databases', value: 'Proficient' },
              ].map(({ label, value }) => (
                <div key={label} className="glass rounded-xl px-4 py-3 text-center">
                  <div className="text-sm text-gray-500">{label}</div>
                  <div className="text-sm font-semibold text-primary-300">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="card p-6 flex flex-col items-start gap-3 group hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-white text-sm">{title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="card p-6 text-center group hover:scale-105 transition-all duration-300"
            >
              <Icon className="w-8 h-8 text-primary-400 mx-auto mb-3 group-hover:rotate-6 transition-transform" />
              <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
