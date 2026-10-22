import type { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

/**
 * Every route in the book. The list is intentionally flat so that both the
 * router and the page-flip layer can render the same tree at a given location.
 */
export const pageRoutes: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: 'about', element: <About /> },
  { path: 'skills', element: <Skills /> },
  { path: 'projects', element: <Projects /> },
  { path: 'experience', element: <Experience /> },
  { path: 'contact', element: <Contact /> },
];
