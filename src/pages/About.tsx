import AboutSection from '../components/About';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        path="/about"
        title="About Samwel Edmund Oguda | AI Developer & ML Engineer"
        description="Learn about Samwel Edmund Oguda - AI Developer, Machine Learning Engineer and Backend Developer passionate about intelligent systems, AgriTech innovation and practical AI solutions."
      />
      <div className="py-16 sm:py-24">
        <AboutSection />
      </div>
    </>
  );
}
