import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { personalInfo } from '../data';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
            {personalInfo.name}
          </h1>
          <h2 className="text-2xl md:text-4xl text-gray-600 mb-6">
            {personalInfo.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            {personalInfo.bio}
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="text-3xl" />
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-3xl" />
              </a>
            )}
            {personalInfo.twitter && (
              <a
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-3xl" />
              </a>
            )}
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                aria-label="Email"
              >
                <FaEnvelope className="text-3xl" />
              </a>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
              Get in Touch
            </button>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              View My Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
