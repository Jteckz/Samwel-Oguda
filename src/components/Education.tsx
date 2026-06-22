import { motion } from 'framer-motion';
import { GraduationCap, Brain, Code, Cloud } from 'lucide-react';

const educationItems = [
  {
    degree: 'Computer Science / IT',
    institution: 'University / College',
    period: 'Ongoing',
    description: 'Foundational studies in computer science, programming, and information technology systems.',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    degree: 'AI & Cloud Computing Studies',
    institution: 'Huawei ICT Academy',
    period: '2024',
    description: 'Comprehensive study of artificial intelligence concepts and cloud computing technologies through Huawei\'s ICT Academy program.',
    icon: Cloud,
    color: 'from-red-500 to-rose-500',
  },
  {
    degree: 'Self-driven AI & ML Learning',
    institution: 'Independent Study',
    period: '2023 - Present',
    description: 'Continuous self-study in machine learning, deep learning, data science, and AI technologies through online courses and hands-on projects.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
  },
  {
    degree: 'Backend Engineering Studies',
    institution: 'Self-paced Learning',
    period: '2022 - Present',
    description: 'Focused study of backend development including Flask, Node.js, database design, API architecture, and server-side programming.',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Education() {
  return (
    <section id="education" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My academic and self-directed learning journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {educationItems.map((item) => (
            <motion.div
              key={item.degree}
              variants={itemVariants}
              className="card p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-2.5 flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-white group-hover:text-primary-300 transition-colors">
                      {item.degree}
                    </h3>
                    <span className="text-xs font-mono text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{item.institution}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
