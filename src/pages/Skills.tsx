import SkillsSection from '../components/Skills';
import Character from '../components/Character';
import SEO from '../components/SEO';

export default function Skills() {
  return (
    <>
      <SEO
        path="/skills"
        title="Skills | Samwel Edmund Oguda - Python, Flask & Machine Learning"
        description="Technical skills of Samwel Edmund Oguda: Python, Flask, REST APIs, Machine Learning, TensorFlow, Pandas, NumPy, MySQL, PostgreSQL, Linux and Git."
      />
      <div className="py-16 sm:py-24">
        <div className="relative">
          <Character />
          <SkillsSection />
        </div>
      </div>
    </>
  );
}
