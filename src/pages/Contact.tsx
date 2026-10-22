import ContactSection from '../components/Contact';
import Character from '../components/Character';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <>
      <SEO
        path="/contact"
        title="Contact Samwel Edmund Oguda | Software Engineer & AI Developer"
        description="Get in touch with Samwel Edmund Oguda for project collaborations, freelance work or opportunities. Email, WhatsApp and social media links available."
      />
      <div className="py-16 sm:py-24">
        <div className="relative">
          <Character />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
