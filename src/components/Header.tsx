import {useEffect, useState} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({behavior: 'smooth'});
			setIsOpen(false);
		}
	};

	const navItems = [
		{label: 'Home', id: 'hero'},
		{label: 'About', id: 'about'},
		{label: 'Education', id: 'education'},
		{label: 'Test Scores', id: 'test-scores'},
		{label: 'Skills', id: 'skills'},
		{label: 'Experience', id: 'experience'},
		{label: 'Projects', id: 'projects'},
		{label: 'Certifications', id: 'certifications'},
		{label: 'Contact', id: 'contact'},
	];

	return (
		<header
			className={`fixed w-full top-0 z-50 transition-all duration-300 ${
				scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
			<nav className="container mx-auto px-4 py-4 relative">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="text-2xl font-bold text-gray-800">
						<span className="text-blue-600">Arka's</span> Profile
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-8">
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => scrollToSection(item.id)}
								className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
								{item.label}
							</button>
						))}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden text-gray-700 text-2xl"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle menu">
						{isOpen ? <FaTimes/> : <FaBars/>}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div
						className={`absolute top-full left-0 w-full md:hidden transition-all duration-300 ${
							scrolled ? 'bg-white shadow-md' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
						}`}>
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => scrollToSection(item.id)}
								className="block w-full text-left py-3 px-6 text-gray-700
								 hover:text-blue-600 transition-colors duration-300">
								{item.label}
							</button>
						))}
					</div>
				)}
			</nav>
		</header>

	);
};

export default Header;
