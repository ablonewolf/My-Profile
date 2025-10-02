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

export const professionalProjects: Project[] = [
	{
		id: '1',
		title: 'Bank Middleware',
		description: [
			'Designed the database for the application that will work as a transaction middleware between a financial app and a payment gateway.',
			'Incorporated the features of forwarding payment and collection data, and processing the received notifications further to notify the consumers.',
			'Made the application scalable by introducing virtual threads so that it can communicate with separate payment partners concurrently.',
			'Introduced a separate Audit application to monitor the status of all transaction data.'
		],
		technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Spring WebClient', 'Keycloak', 'PostgreSQL', 'Apache CSV', 'TypeScript', 'Angular'],
	},
	{
		id: '2',
		title: 'BRAC ERP',
		description: [
			'Integrated the biometric status for personal profile against all members.',
			'Designed the changes in the Database and value assignment for various biometric statuses.',
			'Integrated the biometric inclusion of personal profile in the UI.'
		],
		technologies: ['Grails', 'Groovy', 'PostgreSQL'],
	},
	{
		id: '3',
		title: 'Fuel Management',
		description: [
			'Worked as the team lead and maintainer of the back end.',
			'Set up the skeleton project and designed the database.',
			'Enforced the SOLID principle.',
			'Improved the execution time of several data retrieval operations.',
			'Developed a reusable structure for uploading numerous records via a spreadsheet.',
			'Instructed Junior peers on clean coding and best practices.'
		],
		technologies: ['Spring Boot', 'Spring Security', 'PostgreSQL', 'Apache POI Excel uploader'],
	},
	{
		id: '4',
		title: 'Vehicle Management',
		description: [
			'Served the role of senior engineer.',
			'Revised the whole codebase and made it maintainable.',
			'Completed the CRUD of a complex entity and optimized all of its DB operations.',
			'Resolved issues found in others\' codes and provided regular guidelines.',
			'Make the query-level operations more performance-oriented.',
			'Assisted the team lead in designing the database and code review.'
		],
		technologies: ['Spring Boot', 'Spring Security', 'PostgreSQL', 'Apache POI Excel uploader'],
	},
	{
		id: '5',
		title: 'Online Travel App',
		description: [
			'Actively involved in developing two modules of the app: tour package and hotel booking.',
			'Developed APIs for both admin-end and user-end, improved the execution time by some milliseconds.',
			'Developed responsive web UI and consumed APIs sent from the concerned back-end, implemented complex validation as well.'
		],
		technologies: ['Spring Boot', 'Microsoft SQL Server', 'React', 'Tailwind', 'Bootstrap'],
	},
	{
		id: '6',
		title: 'Passenger Service System',
		description: [
			'Developed APIs for airline reservation system admin module.',
			'Created user-related APIs and React front-end components.',
			'Conducted research on API gateways (APISIX, Kafka UI, Insecure Deserialization).'
		],
		technologies: ['Spring Boot', 'Spring Security', 'Redis', 'React', 'TypeScript'],
	},
	{
		id: '7',
		title: 'Medict Recommendation Engine',
		description: [
			'Medicine recommendation module based on user search and viewed content.',
			'Enabled AWS simple notification system for batch processing completion tasks.'
		],
		technologies: ['Spring Scheduler', 'AWS SNS', 'Spring Batch'],
	},
	{
		id: '8',
		title: 'Telecommunication Billing System',
		description: [
			'Made the billing system adaptable to various requirements.',
			'Developed adapters for existing billing systems.'
		],
		technologies: ['Spring Boot', 'Spring Data JPA'],
	},
	{
		id: '9',
		title: 'Full Functional ChatBot',
		description: [
			'Enhanced Java Reusable Library with WebSocket chatbot support.',
			'Created REST APIs for user blocking, chat groups, and more.'
		],
		technologies: ['Spring Boot', 'WebSocket', 'StockJS'],
	},
	{
		id: '10',
		title: 'Denka Document Management System',
		description: [
			'Document and user management system for a chemical company.',
			'Developed APIs and resolved UI bugs.'
		],
		technologies: ['Spring Boot', 'JQuery', 'BootStrap', 'Responsive Web-Design', 'Thymeleaf'],
	},
];

export const personalProjects: Project[] = [
	{
		id: '1',
		title: 'StudentERP',
		description: [
			'This is an ERP-based web application.',
			'The Backend part was built using Spring boot, Spring Restful services, and MySQL.',
			'The front end was built using React JS and CSS.'
		],
		technologies: ['Spring Boot', 'Spring Rest', 'MySQL', 'React', 'CSS'],
		githubUrl: 'https://github.com/ablonewolf/StudentERP',
	},
	{
		id: '2',
		title: 'To-Do-List App',
		description: [
			'A to-do list web application developed using React, TypeScript, and Bootstrap CSS framework.'
		],
		technologies: ['React', 'TypeScript', 'Bootstrap'],
		githubUrl: 'https://github.com/ablonewolf/To-Do-List-App',
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


