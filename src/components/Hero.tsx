import { motion } from 'framer-motion';
import { Cpu, Brain, Code, Database, Globe, Sparkles } from 'lucide-react';
import mePhoto from '../assets/images/me.jpeg';

const floatingIcons = [
  { Icon: Cpu, color: 'text-neon-blue', delay: 0, x: '10%', y: '22%' },
  { Icon: Brain, color: 'text-neon-purple', delay: 0.8, x: '85%', y: '18%' },
  { Icon: Code, color: 'text-neon-pink', delay: 1.6, x: '12%', y: '68%' },
  { Icon: Database, color: 'text-accent-400', delay: 0.4, x: '82%', y: '70%' },
  { Icon: Globe, color: 'text-primary-400', delay: 1.2, x: '92%', y: '45%' },
  { Icon: Sparkles, color: 'text-yellow-400', delay: 2, x: '5%', y: '45%' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      {floatingIcons.map(({ Icon, color, delay, x, y }) => (
        <motion.div
          key={delay}
          className={`pointer-events-none absolute ${color}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.2, delay, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2.5 }}
        >
          <Icon className="h-8 w-8 md:h-10 md:w-10" />
        </motion.div>
      ))}

      <div className="mx-auto w-full max-w-2xl px-6">
        <div className="flex justify-between gap-4">
          <div className="flex flex-1 flex-col space-y-3">
            <span className="inline-flex w-max items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-xs text-primary-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              Available for opportunities
            </span>
            <h1 className="text-xl font-bold tracking-tighter sm:text-3xl lg:text-4xl">
              Hi, I'm <span className="text-primary-400">Samwel</span>
            </h1>
            <p className="max-w-[600px] leading-relaxed text-gray-400 md:text-xl">
              Software Engineer and AI Developer building intelligent systems with Python and
              machine learning. Passionate about solving real-world problems — from AgriTech to
              predictive analytics.
            </p>
          </div>
          <div className="flex size-24 shrink-0 overflow-hidden rounded-full border border-gray-700 sm:size-28">
            <img
              src={mePhoto}
              alt="Samwel Edmund Oguda"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
