import { motion } from 'framer-motion';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';

const projects = [
  {
    title: 'Smart Water Level Detection System',
    description: 'A smart embedded system that detects and monitors water levels automatically using Arduino Uno microcontroller technology.',
    tags: ['Arduino', 'Embedded Systems', 'IoT', 'C++'],
    github: 'https://github.com/Jteckz',
    demo: '#',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Iris Prediction ML System',
    description: 'A machine learning classification project built for predicting iris flower species using supervised learning algorithms.',
    tags: ['Python', 'Machine Learning', 'Scikit-learn', 'Classification'],
    github: 'https://github.com/Jteckz',
    demo: '#',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Titanic Survival Prediction',
    description: 'A binary classification machine learning project focused on data preprocessing, feature engineering, and survival prediction.',
    tags: ['Python', 'Data Science', 'Feature Engineering', 'Classification'],
    github: 'https://github.com/Jteckz',
    demo: '#',
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Flask REST APIs',
    description: 'Collection of Flask API systems built for authentication, CRUD operations, and backend services.',
    tags: ['Flask', 'REST APIs', 'Python', 'Backend'],
    github: 'https://github.com/Jteckz',
    demo: '#',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Agricultural Marketplace Platform',
    description: 'A technology-driven platform idea designed to connect farmers directly with buyers without intermediaries.',
    tags: ['Flask', 'React', 'Database Design', 'AgriTech'],
    github: 'https://github.com/Jteckz',
    demo: '#',
    color: 'from-lime-500 to-green-500',
  },
  {
    title: 'Snack & Beverage Delivery Startup',
    description: 'A startup-focused delivery system concept for distributing snacks and beverages efficiently using coordinated delivery teams.',
    tags: ['Full Stack', 'Logistics', 'Startup', 'Mobile'],
    github: 'https://github.com/Jteckz',
    demo: '#',
    color: 'from-rose-500 to-red-500',
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

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A collection of projects showcasing my skills in AI, backend development, and innovation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="card p-6 h-full flex flex-col group-hover:scale-[1.02] transition-all duration-300 group-hover:neon-glow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} p-2.5 mb-4 flex items-center justify-center`}>
                  <FolderGit2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-full glass text-gray-300 border border-gray-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-800/50">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors group/link"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent-400 transition-colors group/link"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
