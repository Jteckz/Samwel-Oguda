import ExperienceSection from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import SEO from '../components/SEO';

export default function Experience() {
  return (
    <>
      <SEO
        path="/experience"
        title="Experience & Education | Samwel Edmund Oguda"
        description="Professional journey of Samwel Edmund Oguda: Huawei ICT Academy Instructor, Flask API Developer, Machine Learning Practitioner, education and certifications."
      />
      <div className="space-y-20 py-16 sm:py-24">
        <ExperienceSection />
        <Education />
        <Certifications />
      </div>
    </>
  );
}
