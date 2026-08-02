import Reveal from './Reveal';

const educationItems = [
  {
    degree: 'Computer Science / IT',
    institution: 'University / College',
    period: 'Ongoing',
    description: 'Foundational studies in computer science, programming, and information technology systems.',
  },
  {
    degree: 'AI & Cloud Computing Studies',
    institution: 'Huawei ICT Academy',
    period: '2024',
    description: "Comprehensive study of artificial intelligence concepts and cloud computing technologies through Huawei's ICT Academy program.",
  },
  {
    degree: 'Self-driven AI & ML Learning',
    institution: 'Independent Study',
    period: '2023 - Present',
    description: 'Continuous self-study in machine learning, deep learning, data science, and AI technologies through online courses and hands-on projects.',
  },
  {
    degree: 'Backend Engineering Studies',
    institution: 'Self-paced Learning',
    period: '2022 - Present',
    description: 'Focused study of backend development including Flask, Node.js, database design, API architecture, and server-side programming.',
  },
];

export default function Education() {
  return (
    <section id="education" className="space-y-6">
      <Reveal>
        <h2 className="text-xl font-bold">Education</h2>
      </Reveal>
      <div className="space-y-6">
        {educationItems.map((item, i) => (
          <Reveal key={item.degree} delay={0.05 + i * 0.02}>
            <div className="border-b border-gray-800/60 pb-6">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-base font-medium text-white">{item.degree}</h3>
                <span className="shrink-0 text-xs text-gray-500">{item.period}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{item.institution}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
