import { motion } from 'framer-motion';
import { Code, Cpu, FlaskConical, Users } from 'lucide-react';

const experiences = [
  {
    role: 'Huawei ICT Academy Instructor',
    company: 'Huawei ICT Academy',
    period: '2024 - Present',
    description: 'Leading AI and Cloud Computing studies, providing technical training and guiding students through practical technology projects.',
    highlights: [
      'AI and Cloud Computing instruction',
      'Technical training and mentorship',
      'Innovation-focused learning programs',
      'Student guidance and project supervision',
    ],
    icon: Users,
    color: 'from-red-500 to-rose-500',
  },
  {
    role: 'Flask API Developer',
    company: 'Self-directed Learning',
    period: '2023 - Present',
    description: 'Building robust REST APIs and backend services using Flask framework, focusing on authentication, CRUD operations, and scalable architecture.',
    highlights: [
      'REST API development with Flask',
      'Authentication system implementation',
      'Database integration and design',
      'API deployment and testing',
    ],
    icon: FlaskConical,
    color: 'from-green-500 to-emerald-500',
  },
  {
    role: 'Machine Learning Practitioner',
    company: 'Practical ML Journey',
    period: '2023 - Present',
    description: 'Hands-on experience building ML models for classification, regression, and data analysis using Python and TensorFlow.',
    highlights: [
      'Classification and regression models',
      'Data preprocessing and cleaning',
      'Feature engineering techniques',
      'Model evaluation and optimization',
    ],
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
  },
  {
    role: 'Backend Development Learner',
    company: 'Continuous Learning',
    period: '2022 - Present',
    description: 'Consistently expanding backend engineering skills across multiple technologies and frameworks.',
    highlights: [
      'Node.js and Express.js development',
      'Database management with MySQL & PostgreSQL',
      'API design principles and best practices',
      'Version control with Git & GitHub',
    ],
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            My professional journey in tech and AI
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/50 to-transparent hidden md:block" />
          <div className="space-y-8">
            {experiences.map((exp) => (
              <motion.div
                key={exp.role}
                variants={itemVariants}
                className="relative pl-0 md:pl-20"
              >
                <div className="hidden md:flex absolute left-4 top-6 w-9 h-9 rounded-full bg-gray-900 border-2 border-primary-500/30 items-center justify-center -translate-x-1/2">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center`}>
                    <exp.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="card p-6 group hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-gray-500">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
