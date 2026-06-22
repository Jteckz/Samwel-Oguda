import { motion } from 'framer-motion';
import { Award, Cloud, Brain, Code, Cpu, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'Huawei ICT Academy - AI Studies',
    issuer: 'Huawei ICT Academy',
    description: 'Comprehensive certification in Artificial Intelligence concepts, applications, and implementations.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    link: '#',
  },
  {
    title: 'Huawei ICT Academy - Cloud Computing',
    issuer: 'Huawei ICT Academy',
    description: 'Certification covering cloud architecture, services, deployment models, and cloud security fundamentals.',
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    link: '#',
  },
  {
    title: 'Machine Learning Practical Learning',
    issuer: 'Self-directed / Online Platforms',
    description: 'Hands-on certification in machine learning covering supervised learning, model evaluation, and data preprocessing.',
    icon: Cpu,
    color: 'from-green-500 to-emerald-500',
    link: '#',
  },
  {
    title: 'Flask Backend Development Practice',
    issuer: 'Self-directed Learning',
    description: 'Practical certification in building REST APIs, authentication systems, and database-driven applications with Flask.',
    icon: Code,
    color: 'from-amber-500 to-orange-500',
    link: '#',
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

export default function Certifications() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Professional certifications and recognized achievements
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              className="card p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} p-3 flex items-center justify-center flex-shrink-0`}>
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{cert.issuer}</p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">
                    {cert.description}
                  </p>
                  <a
                    href={cert.link}
                    className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    View Credential <ExternalLink className="w-3.5 h-3.5" />
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
