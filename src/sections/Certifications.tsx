import {certifications} from '../data';
import {FaCertificate, FaExternalLinkAlt} from 'react-icons/fa';

const Certifications = () => {
	const formatDate = (date: string) => {
		const [year, month] = date.split('-');
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${monthNames[parseInt(month) - 1]} ${year}`;
	};

	// Sort certifications by issueDate descending
	const sortedCertifications = [...certifications].sort((a, b) => {
		// Compare as YYYY-MM for correct order
		return b.issueDate.localeCompare(a.issueDate);
	});

	return (
		<section id="certifications" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
					Certifications
				</h2>
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
					{sortedCertifications.map((cert) => (
						<div
							key={cert.id}
							className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<div className="flex items-start mb-4">
								<FaCertificate className="text-blue-600 text-2xl mr-3 mt-1 flex-shrink-0"/>
								<div className="flex-1">
									<h3 className="text-xl font-semibold text-gray-800 mb-2">
										{cert.name}
									</h3>
									<p className="text-gray-600 mb-2">{cert.issuer}</p>
									<p className="text-sm text-gray-500">
										Issued: {formatDate(cert.issueDate)}
										{cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
									</p>
									{cert.credentialId && (
										<p className="text-sm text-gray-500 mt-1">
											Credential ID: {cert.credentialId}
										</p>
									)}
								</div>
							</div>
							{cert.credentialUrl && (
								<a
									href={cert.credentialUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
								>
									View Credential <FaExternalLinkAlt className="ml-2 text-sm"/>
								</a>
							)}
						</div>
					))}
				</div>
				<div className="max-w-4xl mx-auto mt-8 text-center">
					<p className="text-gray-700">
						Want to see more?&nbsp;
						<a
							href="https://www.linkedin.com/in/ablonewolf99/details/certifications/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:text-blue-700 underline inline-flex items-center"
						>
							Go to my LinkedIn profile to see more of my accomplishments
							<FaExternalLinkAlt className="ml-2 text-sm"/>
						</a>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Certifications;
