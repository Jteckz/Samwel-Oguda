import Reveal from './Reveal';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'SQL', 'C++'],
  },
  {
    title: 'AI & Machine Learning',
    skills: ['TensorFlow', 'NumPy', 'Pandas', 'Machine Learning', 'Data Cleaning', 'Data Science', 'Neural Networks'],
  },
  {
    title: 'Backend Development',
    skills: ['Flask', 'REST APIs', 'Authentication'],
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'Database Design'],
  },
  {
    title: 'Other Technologies',
    skills: ['Linux', 'Kali Linux', 'Git & GitHub', 'Arduino', 'Smart Systems'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="space-y-6">
      <Reveal>
        <h2 className="text-xl font-bold">Skills</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-2 text-sm font-medium text-gray-300">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-gray-700/60 bg-gray-800/50 px-3 py-1 text-xs text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
