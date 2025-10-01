import type { PersonalInfo, Experience, Certification, Project, Skill } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'Your City, Country',
  bio: 'Passionate software developer with experience in building web applications. I love creating efficient, scalable, and user-friendly solutions.',
  github: 'https://github.com/ablonewolf',
  linkedin: 'https://www.linkedin.com/in/yourprofile',
  twitter: 'https://twitter.com/yourhandle',
  website: 'https://ablonewolf.github.io/My-Profile',
};

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Company',
    location: 'Remote',
    startDate: '2022-01',
    description: [
      'Led development of key features for enterprise application',
      'Mentored junior developers and conducted code reviews',
      'Improved application performance by 40%',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    id: '2',
    title: 'Software Developer',
    company: 'Startup Inc',
    location: 'City, Country',
    startDate: '2020-06',
    endDate: '2021-12',
    description: [
      'Built responsive web applications using React and TypeScript',
      'Collaborated with design team to implement UI/UX improvements',
      'Integrated third-party APIs and services',
    ],
    technologies: ['React', 'JavaScript', 'MongoDB', 'Express'],
  },
];

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2023-06',
    credentialUrl: 'https://aws.amazon.com/verification',
  },
  {
    id: '2',
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    issueDate: '2022-03',
    credentialUrl: 'https://www.scrum.org/certificates',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/ablonewolf/ecommerce',
    liveUrl: 'https://example.com',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/ablonewolf/task-manager',
    liveUrl: 'https://example.com',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with location-based forecasts',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
    githubUrl: 'https://github.com/ablonewolf/weather-dashboard',
    liveUrl: 'https://example.com',
  },
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Next.js'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Nginx'],
  },
];
