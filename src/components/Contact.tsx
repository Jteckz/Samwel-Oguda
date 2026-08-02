import { useState } from 'react';
import { Send, Mail, MapPin, Github, Linkedin, MessageCircle, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Reveal from './Reveal';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'samoguda.23@example.com',
    href: 'mailto:samoguda.23@example.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+255 624 015 525',
    href: 'https://wa.me/255624015525',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Tanzania',
    href: '#',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Jteckz', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/samuel-edmund-oguda-7a4ab52a3/', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/255624015525', label: 'WhatsApp' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === '_gotcha') {
      setHoneypot(value);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xjgzjvap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.error || 'Something went wrong. Please try again.');
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-700/60 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-primary-500/50 focus:outline-none';

  return (
    <section id="contact" className="space-y-6">
      <Reveal>
        <h2 className="text-xl font-bold">Contact</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="max-w-[600px] leading-relaxed text-gray-400">
          Have a project in mind or just want to say hi? I'm always open to discussing new ideas,
          creative opportunities, or being part of your vision.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-4">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/40 px-4 py-3 transition-colors hover:border-primary-500/30 hover:bg-gray-900/70"
            >
              <Icon className="h-4 w-4 shrink-0 text-primary-400" />
              <div>
                <div className="text-xs text-gray-500">{label}</div>
                <div className="text-sm text-gray-300">{value}</div>
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="flex items-center gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-full border border-gray-700/60 bg-gray-800/50 text-gray-400 transition-colors hover:text-primary-400"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <input type="text" name="_gotcha" value={honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-gray-400">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm text-gray-400">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Project collaboration"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-gray-400">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Tell me about your project..."
            />
          </div>
          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle className="h-4 w-4" /> Sent Successfully
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send Message
              </>
            )}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
