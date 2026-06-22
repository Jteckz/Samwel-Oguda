import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, MessageCircle, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'samoguda.23@example.com',
    href: 'mailto:samoguda.23@example.com',
  },
  {
    icon: Phone,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's build something amazing together
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="card p-8">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <input type="text" name="_gotcha" value={honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-400 mb-1.5">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-1.5">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-400 mb-1.5">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
                    placeholder="Project collaboration"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-1.5">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                  </div>
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" /> Sent Successfully
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="card p-8">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 p-4 rounded-xl glass group hover:bg-gray-800/60 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{label}</div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors">{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl glass group hover:bg-gray-800/60 hover:border-primary-500/30 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-primary-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="card p-8 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/20">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-8 h-8 text-primary-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Let's Talk</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
