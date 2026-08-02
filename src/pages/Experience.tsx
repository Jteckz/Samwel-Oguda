import ExperienceSection from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';

export default function Experience() {
  return (
    <div className="space-y-20 py-16 sm:py-24">
      <ExperienceSection />
      <Education />
      <Certifications />
    </div>
  );
}
