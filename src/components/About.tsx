import Reveal from './Reveal';

const stats = [
  { value: '3+', label: 'Years coding' },
  { value: '20+', label: 'AI/ML projects' },
  { value: '10+', label: 'Flask APIs' },
  { value: '5+', label: 'Startup ideas' },
];

export default function About() {
  return (
    <section id="about" className="space-y-6">
      <Reveal>
        <h2 className="text-xl font-bold">About</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="space-y-4 leading-relaxed text-gray-400">
          <p>
            I'm <span className="font-medium text-white">Samwel Edmund Oguda</span>, an Software Developer
            and AI Engineer with a deep passion for building intelligent systems that
            solve real-world problems.
          </p>
          <p>
            My journey spans <span className="text-primary-300">artificial intelligence</span>,{' '}
            <span className="text-primary-300">backend engineering</span>, and{' '}
            <span className="text-primary-300">agricultural technology</span> — where I apply
            practical AI solutions to transform traditional industries.
          </p>
          <p>
            From ML models for predictive analytics to scalable Flask APIs, I thrive at the
            intersection of <span className="text-accent-300">innovation</span> and{' '}
            <span className="text-accent-300">practical implementation</span>.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid grid-cols-2 gap-6 pt-2 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-primary-400">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
