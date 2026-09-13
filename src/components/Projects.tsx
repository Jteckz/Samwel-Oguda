import { Github, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

const projects = [
  {
    title: 'XVec AI| Production',
    description: 'Grounded Production RAG for Trustworthy PDF Q&A',
    tags: ['PDF Q&A + Hybrid Search (BM25 + vector RRF) + Cross-Encoder Rerank + Grounding + Page-Level Citations + LangGraph + FastAPI + React'],
    github: 'https://github.com/Jteckz/production-RAG',
    demo: '#',
  },
  {
    title: 'Iris Prediction ML System',
    description: 'A machine learning classification project built for predicting iris flower species using supervised learning algorithms.',
    tags: ['Python', 'Machine Learning', 'Scikit-learn', 'Classification'],
    github: 'https://github.com/Jteckz',
    demo: '#',
  },
  {
    title: 'Titanic Survival Prediction',
    description: 'A binary classification machine learning project focused on data preprocessing, feature engineering, and survival prediction.',
    tags: ['Python', 'Data Science', 'Feature Engineering', 'Classification'],
    github: 'https://github.com/Jteckz',
    demo: '#',
  },
  {
    title: 'Flask REST APIs',
    description: 'Collection of Flask API systems built for authentication, CRUD operations, and backend services.',
    tags: ['Flask', 'REST APIs', 'Python', 'Backend'],
    github: 'https://github.com/Jteckz',
    demo: '#',
  },
  {
    title: 'Agricultural Marketplace Platform',
    description: 'A technology-driven platform idea designed to connect farmers directly with buyers without intermediaries.',
    tags: ['Flask', 'React', 'Database Design', 'AgriTech'],
    github: 'https://github.com/Jteckz',
    demo: '#',
  },
  {
    title: 'Snack & Beverage Delivery Startup',
    description: 'A startup-focused delivery system concept for distributing snacks and beverages efficiently using coordinated delivery teams.',
    tags: ['Full Stack', 'Logistics', 'Startup', 'Mobile'],
    github: 'https://github.com/Jteckz',
    demo: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="space-y-6">
      <Reveal>
        <h2 className="text-xl font-bold">Projects</h2>
      </Reveal>
      <div className="space-y-0">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={0.05 + i * 0.02}>
            <div className="group border-b border-gray-800/60 py-5">
              <div className="flex items-start justify-between gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title"
                >
                  <h3 className="text-base font-medium text-white underline decoration-1 underline-offset-4 transition-colors group-hover/title:text-primary-300">
                    {project.title}
                  </h3>
                </a>
                <div className="flex shrink-0 items-center gap-3 pt-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub`}
                    className="text-gray-500 transition-colors hover:text-primary-400"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      aria-label={`${project.title} demo`}
                      className="text-gray-500 transition-colors hover:text-accent-400"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{project.description}</p>
              <p className="mt-3 text-xs text-gray-500">{project.tags.join(' · ')}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
