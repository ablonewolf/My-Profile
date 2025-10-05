import {personalInfo} from '../data';

const About = () => {
	return (
		<section id="about" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
					About Me
				</h2>

				{/* Adjusted grid for more space on text */}
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
					{/* Image Section */}
					<div className="flex justify-center lg:justify-end">
						<img
							src="/My-Profile/picture.png"
							alt="Profile"
							className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-gray-200"
						/>
					</div>

					{/* Text Section spanning 2/3 of the grid */}
					<div className="lg:col-span-2 bg-gray-50 rounded-lg p-10 shadow-md">
						<p className="text-lg text-gray-700 mb-6">
							{personalInfo.bio}
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
							<div>
								<h3 className="font-semibold text-gray-800 mb-2">Location</h3>
								<p className="text-gray-600">{personalInfo.location}</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-800 mb-2">Email</h3>
								<p className="text-gray-600">{personalInfo.email}</p>
							</div>
							{personalInfo.phone && (
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
									<p className="text-gray-600">{personalInfo.phone}</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
