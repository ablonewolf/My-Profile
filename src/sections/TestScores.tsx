import {testScores} from '../data';
import type {TestScore} from '../types';

const TestScores = () => {
	return (
		<section id="test-scores" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
					Generalized Test Scores
				</h2>
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
					{testScores.map((test: TestScore, index: number) => (
						<div
							key={index}
							className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<h3 className="text-2xl font-semibold text-gray-800 mb-3">
								{test.test}
							</h3>
							<div className="mb-4 pb-3 border-b border-gray-200">
                <span className="text-lg font-medium text-blue-600">
                  Total: {test.total}
                </span>
							</div>
							<ul className="space-y-2">
								{test.sections.map((section, idx) => (
									<li
										key={idx}
										className="flex justify-between items-center py-1"
									>
                    <span className="text-gray-700 font-medium">
                      {section.name}:
                    </span>
										<span className="text-gray-600">
                      {section.score}
                    </span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestScores;
