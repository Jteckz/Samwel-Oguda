import { ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

const certifications = [
  {
    title: 'Huawei ICT Academy - AI Studies',
    issuer: 'Huawei ICT Academy',
    description: 'Comprehensive certification in Artificial Intelligence concepts, applications, and implementations.',
    link: '#',
  },
  {
    title: 'Huawei ICT Academy - Cloud Computing',
    issuer: 'Huawei ICT Academy',
    description: 'Certification covering cloud architecture, services, deployment models, and cloud security fundamentals.',
    link: '#',
  },
  {
    title: 'Machine Learning Practical Learning',
    issuer: 'Self-directed / Online Platforms',
    description: 'Hands-on certification in machine learning covering supervised learning, model evaluation, and data preprocessing.',
    link: '#',
  },
  {
    title: 'Flask Backend Development Practice',
    issuer: 'Self-directed Learning',
    description: 'Practical certification in building REST APIs, authentication systems, and database-driven applications with Flask.',
    link: '#',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="space-y-6">
      <Reveal>
        <h2 className="text-xl font-bold">Certifications</h2>
      </Reveal>
      <div className="space-y-0">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={0.05 + i * 0.02}>
            <div className="border-b border-gray-800/60 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-white">{cert.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">{cert.issuer}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{cert.description}</p>
                </div>
                {cert.link !== '#' && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cert.title} credential`}
                    className="shrink-0 pt-1 text-gray-500 transition-colors hover:text-primary-400"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
