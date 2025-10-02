import {professionalProjects, personalProjects} from '../data';
import {FaGithub} from 'react-icons/fa';
import type {Project} from '../types';

const ProjectCard = ({project}: { project: Project }) => (
	<div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
		<div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
			<span className="text-white text-6xl">💻</span>
		</div>
		<div className="p-6">
			<h3 className="text-xl font-semibold text-gray-800 mb-2">
				{project.title}
			</h3>
			<div className="text-gray-600 mb-4">
				{project.description.map((line: string, idx: number) => (
					<span key={idx} className="block">{line}</span>
				))}
			</div>
			<div className="flex flex-wrap gap-2 mb-4">
				{project.technologies.map((tech: string, idx: number) => (
					<span
						key={idx}
						className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
					>
            {tech}
          </span>
				))}
			</div>
			{project.githubUrl && (
				<div className="flex space-x-4">
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
					>
						<FaGithub className="mr-1"/> Code
					</a>
				</div>
			)}
		</div>
	</div>
);

const Projects = () => {
	return (
		<section id="projects" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
					Projects
				</h2>
				<h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Professional Projects and Contributions
				</h3>
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{professionalProjects.map((project) => (
						<ProjectCard key={project.id} project={project}/>
					))}
				</div>
				<h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Personal Projects
				</h3>
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{personalProjects.map((project) => (
						<ProjectCard key={project.id} project={project}/>
					))}
				</div>
				<div className="text-center mt-8 text-gray-600">
					There are more projects in my <a href="https://github.com/ablonewolf" target="_blank"
													 rel="noopener noreferrer" className="text-blue-600 underline">GitHub
					profile</a>.
				</div>
			</div>
		</section>
	);
};

export default Projects;
