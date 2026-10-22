import ProjectsSection from '../components/Projects';
import Character from '../components/Character';
import SEO from '../components/SEO';

export default function Projects() {
  return (
    <>
      <SEO
        path="/projects"
        title="Projects | Samwel Edmund Oguda - AI, ML & Backend Projects"
        description="Explore projects by Samwel Edmund Oguda: Smart water level detection, Iris prediction ML system, Titanic survival prediction, Flask REST APIs and AgriTech platforms."
      />
      <div className="py-16 sm:py-24">
        <div className="relative">
          <Character />
          <ProjectsSection />
        </div>
      </div>
    </>
  );
}
