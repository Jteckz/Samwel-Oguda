import { Link } from 'react-router-dom';
import { Code2, Heart, ArrowUp } from 'lucide-react';

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-950/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-primary-400" />
              <span className="font-bold text-lg bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Samwel<span className="text-white">.dev</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Building intelligent solutions with AI, Python, and innovation. 
              Passionate about creating technology that makes a difference.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-500 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs rounded-lg glass text-gray-400 border border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Designed & Built by Samwel Edmund Oguda
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 p-3 rounded-xl glass text-primary-400 hover:text-white hover:bg-gray-800/60 hover:border-primary-500/30 transition-all duration-300 hover:scale-110 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
}
