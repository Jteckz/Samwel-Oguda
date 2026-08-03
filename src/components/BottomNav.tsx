import { Link, useLocation } from 'react-router-dom';
import { Home, User, Code2, FolderGit2, Briefcase, Mail, Github, Linkedin, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/about', icon: User, label: 'About' },
  { path: '/skills', icon: Code2, label: 'Skills' },
  { path: '/projects', icon: FolderGit2, label: 'Projects' },
  { path: '/experience', icon: Briefcase, label: 'Experience' },
  { path: '/contact', icon: Mail, label: 'Contact' },
];

const socialItems = [
  { href: 'https://github.com/Jteckz', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/samuel-edmund-oguda-7a4ab52a3/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://wa.me/255624015525', icon: MessageCircle, label: 'WhatsApp' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom justify-center">
        <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-gray-950 to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="pointer-events-auto relative z-50 mx-auto flex h-full w-max items-center rounded-full border border-gray-700/50 bg-gray-900/70 px-1 p-2 shadow-lg shadow-black/40 backdrop-blur-xl">
          <nav aria-label="Primary" className="flex items-center">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  aria-label={label}
                  aria-current={isActive ? 'page' : undefined}
                  title={label}
                  className={`flex aspect-square items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? 'text-primary-400'
                      : 'text-gray-500 hover:bg-gray-800 hover:text-white'
                  }`}
                  style={{ width: 40 }}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </nav>
          <div className="mx-1 h-full w-px bg-gray-700/50" />
          <nav aria-label="Social" className="flex items-center">
            {socialItems.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex aspect-square items-center justify-center rounded-full text-gray-500 transition-colors hover:text-primary-400"
                style={{ width: 40 }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
