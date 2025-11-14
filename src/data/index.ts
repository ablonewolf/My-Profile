import type {PersonalInfo, Experience, Certification, Project, Skill} from '../types';

function numberToWords(n: number): string {
	const ones = [
		'zero', 'one', 'two', 'three', 'four', 'five', 'six',
		'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
		'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
		'eighteen', 'nineteen', 'twenty'
	];
	if (n <= 20) return ones[n];
	const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	if (n < 100) {
		const t = Math.floor(n / 10);
		const r = n % 10;
		return r === 0 ? tens[t] : `${tens[t]}-${ones[r]}`;
	}
	return String(n);
}

const getExperienceText = () => {
	const start = new Date('2022-04-01T00:00:00Z');
	const now = new Date();
	const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
	const years = (now.getTime() - start.getTime()) / msPerYear;
	const whole = Math.floor(years);
	const frac = years - whole;
	let experienceText: string;
	if (whole === 0) {
		experienceText = 'less than a year';
	} else if (frac < 0.25) {
		experienceText = `over ${numberToWords(whole)} ${whole === 1 ? 'year' : 'years'}`;
	} else if (frac < 0.75) {
		experienceText = `over ${numberToWords(whole)} and a half years`;
	} else {
		const rounded = whole + 1;
		experienceText = `over ${numberToWords(rounded)} ${rounded === 1 ? 'year' : 'years'}`;

	}
	return experienceText;
}

export const personalInfo: PersonalInfo = {
	name: 'Arka Bhuiyan',
	title: 'Software Engineer',
	email: 'arkabhuiyancsedu@gmail.com',
	location: 'Dhaka, Bangladesh',
	bio: (() => {
		return (
			`With ${getExperienceText()} of experience in backend web development, ` +
			`I specialize in backend engineering with Java and Spring Boot. My work has been driven by a passion ` +
			`for building scalable, high-performing applications and collaborating with teams to deliver ` +
			`reliable software solutions.  \n\nMy expertise lies at the intersection of backend development, ` +
			`Linux-based systems, and distributed computing. Additionally, I possess a moderate knowledge in the realm ` +
			`of frontend development, with notable efficiency in React and Angular. From designing efficient APIs and microservices ` +
			`to exploring parallel computing, Big Data, security, and cryptography, I enjoy tackling complex ` +
			`challenges with clean, maintainable approaches.  \n\nBeyond my professional work, I thrive on continuous ` +
			`learning—whether it’s solving algorithmic challenges on LeetCode, experimenting with open-source tools, ` +
			`or diving into new technologies. My focus is always on combining strong engineering fundamentals with ` +
			`forward-thinking approaches that push software boundaries.`
		);
	})(),
	summaryBio: (() => {
		return (
			`With ${getExperienceText()} years of backend development experience using Java and Spring Boot, I focus on building` +
			` robust, scalable systems. My interests include distributed systems, parallel computing, Big Data,` +
			` cryptography, and leveraging Linux-based environments to deliver reliable solutions.`
		);
	})(),
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
		name: 'Spring Boot 3, Spring 6 & Hibernate for Beginners',
		issuer: 'Udemy',
		issueDate: '2022-10',
		credentialUrl: 'https://www.udemy.com/certificate/UC-7b07c6b5-9301-45a4-b000-19d69c5dca93/',
	},
	{
		id: '2',
		name: 'Python for Everybody Specialization',
		issuer: 'Coursera',
		issueDate: '2020-09',
		credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/99337KLHU3P7',
	},
	{
		id: '3',
		name: 'Mathematics for Machine Learning Specialization',
		issuer: 'Coursera',
		issueDate: '2023-09',
		credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/L6NJ5TSRRRCG',
	},
	{
		id: '4',
		name: 'Java Virtual Threads & Concurrency Masterclass [Hands-On]',
		issuer: 'Udemy',
		issueDate: '2024-12',
		credentialUrl: 'https://www.udemy.com/certificate/UC-f5e5e78f-a3bb-4443-8b7d-b6daf42504bd/',
	},
	{
		id: '5',
		name: 'Mastering Java Reactive Programming [From Scratch]',
		issuer: 'Udemy',
		issueDate: '2025-06',
		credentialUrl: 'https://www.udemy.com/certificate/UC-ef2a6834-4bff-4f6b-9092-2c709fc0fd37/',
	},
	{
		id: '6',
		name: 'Learn C++ Programming -Beginner to Advance- Deep Dive in C++',
		issuer: 'Udemy',
		issueDate: '2023-03',
		credentialUrl: 'https://www.udemy.com/certificate/UC-e5e7ec8e-b8fe-407a-89e8-00ff07809b10/',
	},
	{
		id: '7',
		name: 'The Complete SQL Bootcamp: Go from Zero to Hero',
		issuer: 'Udemy',
		issueDate: '2025-10',
		credentialUrl: 'https://www.udemy.com/certificate/UC-2f616f85-4f54-4098-906f-9107be6b3cbe/',
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
	{
		id: '3',
		title: 'Course Catalog Service',
		description: [
			'A bank-end service for managing course catalogs, built with Spring Boot and PostgreSQL.',
			'It provides RESTful APIs for creating, reading, updating, and deleting course information.'
		],
		technologies: ['Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Kotlin', 'TestContainers'],
		githubUrl: 'https://github.com/ablonewolf/course-catalog-service'
	},
	{
		id: '4',
		title: 'Task Manager App',
		description: [
			'A frontend application to manage tasks, built with Angular and Typescript'
		],
		technologies: ['Angular', 'Typescript', 'CSS'],
		githubUrl: 'https://github.com/ablonewolf/Task-Manager-using-Angular'
	},
	{
		id: '5',
		title: 'Introduction to Virtual Thread',
		description: [
			'A R&D type repository to explore the newly introduced Virtual Thread in Java 21 and its performance compared to traditional threads.'
		],
		technologies: ['Java'],
		githubUrl: 'https://github.com/ablonewolf/virtual-thread-intro'
	},
	{
		id: '6',
		title: 'Introduction to Reactive Programming in Java with Project Reactor',
		description: [
			'A R&D type repository to explore the Reactive Programming paradigm in Java using Project Reactor'
		],
		technologies: ['Java', 'Project Reactor'],
		githubUrl: 'https://github.com/ablonewolf/Reactive-Programming-Intro'
	},
	{
		id: '7',
		title: 'Algorithms and Data Structures in C++',
		description: [
			'A repository containing implementations of various algorithms and data structures in C++'
		],
		technologies: ['C++'],
		githubUrl: 'https://github.com/ablonewolf/Algoritms-and-Data-Structures-in-CPP'
	}
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
			'Reactive Programming using Project Reactor',
			'Spring Web-Flux',
			'Spring Batch',
			'Kafka',
			'RabbitMQ',
			'Micronaut',
			'JUnit5',
			'Mockito',
			'Web Test Client',
			'Test Containers'
		],
	},
	{
		category: 'Front-end Technologies',
		items: [
			'CSS',
			'Responsive Web Design',
			'JavaScript',
			'Typescript',
			'Bootstrap',
			'Tailwind',
			'React',
			'NextJS',
			'JQuery',
			'Angular',
			'Prime NG'
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
		items: ['Docker', 'Linux Command Line', 'SDKMAN', 'SFTP'],
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
			'Took part in various club activities and was an active member of the Science Club, the English Club,' +
			' and the Drama Club',
		],
	},
	{
		id: '3',
		degree: 'Secondary School Certificate (Science)',
		institution: 'St. Joseph Higher Secondary School',
		location: 'Dhaka, Bangladesh',
		startDate: '2011-01',
		endDate: '2013-06',
		description: [
			'Took part in various club activities and was an active member of the Science Club, the English Club,' +
			' and the Drama Club',
		],
	}
];

export const testScores = [
	{
		test: "GRE",
		total: "313 out of 340",
		sections: [
			{name: "Quantitative", score: "161 out of 170"},
			{name: "Verbal", score: "152 out of 170"},
			{name: "Analytical Writing (AWA)", score: "3.0 out of 6.0"}
		]
	},
	{
		test: "TOEFL",
		total: "99 out of 120",
		sections: [
			{name: "Reading", score: "24 out of 30"},
			{name: "Listening", score: "27 out of 30"},
			{name: "Speaking", score: "23 out of 30"},
			{name: "Writing", score: "25 out of 30"}
		]
	}
];



