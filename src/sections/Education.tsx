import {education} from '../data';
import {FaGraduationCap, FaMapMarkerAlt, FaCalendar} from 'react-icons/fa';

const Education = () => {
	const formatDate = (date: string) => {
		const [year, month] = date.split('-');
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${monthNames[parseInt(month) - 1]} ${year}`;
	};

	return (
		<section id="education" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
					Education
				</h2>
				<div className="max-w-4xl mx-auto">
					{education.map((edu) => (
						<div
							key={edu.id}
							className="mb-8 bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
								<div className="flex-1">
									<h3 className="text-2xl font-semibold text-gray-800 flex items-center">
										<FaGraduationCap className="mr-2 text-blue-600"/>
										{edu.degree}
									</h3>
									<p className="text-xl text-gray-600 mt-1">{edu.institution}</p>
								</div>
								<div className="mt-2 md:mt-0 md:text-right">
									<p className="text-gray-600 flex items-center md:justify-end">
										<FaCalendar className="mr-2 text-blue-600"/>
										{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
									</p>
									<p className="text-gray-600 flex items-center md:justify-end mt-1">
										<FaMapMarkerAlt className="mr-2 text-blue-600"/>
										{edu.location}
									</p>
								</div>
							</div>
							{edu.description && (
								<ul className="list-disc list-inside space-y-2 mb-4">
									{edu.description.map((desc, idx) => (
										<li key={idx} className="text-gray-700">
											{desc}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Education;
