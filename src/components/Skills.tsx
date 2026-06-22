import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Code2, Brain, Server, Database, Terminal } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 75 },
      { name: 'SQL', level: 80 },
      //{ name: 'C', level: 70 },
      { name: 'C++', level: 65 },
    ],
  },
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'TensorFlow', level: 85 },
      { name: 'NumPy', level: 90 },
      { name: 'Pandas', level: 90 },
      { name: 'Machine Learning', level: 88 },
      { name: 'Data Cleaning', level: 85 },
      { name: 'Data Science', level: 85 },
      { name: 'Neural Networks', level: 80 },
      //{ name: 'Computer Vision', level: 75 },
      //{ name: 'Regression Models', level: 85 },
      //{ name: 'Classification Models', level: 85 },
    ],
  },
  {
    title: 'Backend Development',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Flask', level: 82 },
      { name: 'REST APIs', level: 77 },
      //{ name: 'Node.js', level: 80 },
      //{ name: 'Express.js', level: 78 },
      { name: 'Authentication', level: 82 },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Database Design', level: 82 },
    ],
  },
  {
    title: 'Other Technologies',
    icon: Terminal,
    color: 'from-red-500 to-rose-500',
    skills: [
      { name: 'Linux', level: 85 },
      { name: 'Kali Linux', level: 70 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Arduino', level: 75 },
      { name: 'Smart Systems', level: 78 },
    ],
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

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300">{name}</span>
        <span className="text-xs text-gray-500">{level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            Technologies and tools I work with to build intelligent solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map(({ title, icon: Icon, color, skills }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="card p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
              </div>
              <div className="space-y-1">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
