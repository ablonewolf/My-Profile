import type {PersonalInfo, Experience, Certification, Project, Skill} from '../types';

export const personalInfo: PersonalInfo = {
	name: 'Arka Bhuiyan',
	title: 'Full Stack Software Engineer',
	email: 'arkabhuiyancsedu@gmail.com',
	location: 'Dhaka, Bangladesh',
	bio: 'A passionate CS major and Software Engineer in Full stack Web Application development with a focus on Backend technologies.' +
		' Experienced in building scalable web applications and working with cross-functional teams to deliver high-quality software solutions.' +
		' Proficient in Java, Kotlin, C++, Spring Framework, TypeScript, JavaScript, React, Angular, and Python. Strong problem-solving skills and a keen eye for detail.',
	github: 'https://github.com/ablonewolf',
	linkedin: 'https://www.linkedin.com/in/ablonewolf99/',
	website: 'https://ablonewolf.github.io/My-Profile',
	leetcode: 'https://leetcode.com/ablonewolf/'
};

export const experiences: Experience[] = [
	{
		id: '1',
		title: 'Software Engineer',
		company: 'BRAC IT Services Limited',
		location: 'Gulshan, Dhaka, Bangladesh',
		startDate: '2024-06',
		endDate: 'Present',
		description: [
			'Developed and maintained the bank middleware application for Financial transactions of BRAC',
			'Developed the Audit application for the bank middleware to track all the transactions',
			'Took part in R&D projects to explore new technologies and tools for a microservice-based architecture',
			'Collaborated with cross-functional teams to define, design, and ship new features',
			'Optimized application performance and scalability',
			'Participated in code reviews and provided constructive feedback to team members',
			'Wrote unit and integration tests to ensure code quality and reliability'
		],
		technologies: ['Java', 'Spring Framework', 'Postgres', 'SFTP', 'Docker', 'RabbitMQ', 'Typescript', 'Angular'],
	},
	{
		id: '2',
		title: 'Software Engineer',
		company: 'TechnoNext',
		location: 'Baridhara, Dhaka, Bangladesh',
		startDate: '2023-05',
		endDate: '2024-06',
		description: [
			'Developed the admin module for the Airlines reservation system',
			'Developed the management tool for the refund policy system for a Tourism application',
			'Developed the Inquiry services(both custom and tour specific type inquiry) for a Tourism application(both Back-office and front-office)',
			'Enabled advanced searching for tour bookings and inquiries in the Back-office application',
			'Developed the inquiry service for the Visa application system',
			'Led the development for the Fuel Management System of Aircraft',
			'Developed the Job Card system for the Transport Management System'
		],
		technologies: ['Java', 'Spring Framework', 'Postgres', 'Microsoft SQL Server', 'React',
			'JavaScript', 'Typescript', 'Next JS'],
	},
	{
		id: '3',
		title: 'Software Engineer',
		company: 'BJIT Limited',
		location: 'Satarkul, Badda, Dhaka, Bangladesh',
		startDate: '2022-04',
		endDate: '2023-05',
		description: [
			'Developed the Simple Notification System of AWS in a recommendation system for an E-pharmacy application',
			'Solved several Responsive related issues and bugs for a Web application for a chemical company',
			'Developed the student management module for the training academy of BJIT Limited'
		],
		technologies: ['Java', 'Spring Framework', 'Postgres', 'MySQL', 'React', 'JavaScript'],
	}
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
		category: 'Programming Languages',
		items: ['Java', 'C++', 'Python', 'JavaScript', 'TypeScript', 'Kotlin'],
	},
	{
		category: 'Back-end Technologies',
		items: [
			'Spring Boot',
			'Spring Data JPA',
			'Spring Security',
			'Hibernate',
			'Reactive Programming',
			'Spring Web-Flux',
			'Spring Batch',
			'Kafka',
		],
	},
	{
		category: 'Front-end Technologies',
		items: [
			'CSS',
			'Responsive Web Design',
			'Bootstrap',
			'Tailwind',
			'React',
			'JQuery',
			'Node',
		],
	},
	{
		category: 'Database',
		items: ['SQL', 'PostgreSQL', 'MySQL', 'Microsoft SQL Server'],
	},
	{
		category: 'Build-Systems',
		items: ['Maven', 'Gradle', 'NPM'],
	},
	{
		category: 'Version Control',
		items: ['Git', 'Github', 'Bit Bucket', 'Gerrit'],
	},
	{
		category: 'Other',
		items: ['Docker', 'Linux Command Line', 'SDKMAN'],
	},
];

import type {Education} from '../types';

export const education: Education[] = [
	{
		id: '1',
		degree: 'B.Sc. in Computer Science & Engineering',
		institution: 'University of Dhaka',
		location: 'Dhaka, Bangladesh',
		startDate: '2016-01',
		endDate: '2020-01',
		description: [
			'CGPA: 2.81/4.00',
			'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering,' +
			' Crypography & Computer Security, Distributed Systems & Parallel Computing,' +
			' Operating Systems, Computer Networks, Web Technologies, Object-Oriented Programming,' +
			' Microprocessors and Microcontrollers',
		],
	},
	{
		id: '2',
		degree: 'Higher Secondary School Certificate (Science)',
		institution: 'Notre Dame College',
		location: 'Dhaka, Bangladesh',
		startDate: '2013-07',
		endDate: '2015-06',
		description: [
			'CGPA: 5.00/5.00',
			'Took part in various club activities and was an active member of the Science Club, the English Club,' +
			' and the Drama Club',
		],
	}
];


