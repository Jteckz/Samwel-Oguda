import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { SITE } from '../config';

export default function Home() {
  return (
    <>
      <SEO
        path="/"
        title={SITE.title}
        description="Samwel Edmund Oguda - Software Engineer, Backend Developer and Machine Learning Practitioner. Building intelligent systems with Python, Flask, TensorFlow and AI. Based in Dar es Salaam, Tanzania."
      />
      <Hero />
    </>
  );
}
