import Reveal from './Reveal';

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
  },
];

export default function Experience() {
  return (
    <section id="experience" className="space-y-6">
      <Reveal>
        <h2 className="text-xl font-bold">Experience</h2>
      </Reveal>
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <Reveal key={exp.role} delay={0.05 + i * 0.02}>
            <div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-base font-medium text-white">
                  {exp.role} <span className="font-normal text-gray-500">· {exp.company}</span>
                </h3>
                <span className="shrink-0 text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{exp.description}</p>
              <ul className="mt-3 space-y-1.5">
                {exp.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
