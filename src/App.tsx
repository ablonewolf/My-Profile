import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Education from "./sections/Education.tsx";

function App() {
	return (
		<div className="min-h-screen">
			<Header/>
			<main>
				<Hero/>
				<About/>
				<Education/>
				<Skills/>
				<Experience/>
				<Projects/>
				<Certifications/>
				<Contact/>
			</main>
			<Footer/>
		</div>
	);
}

export default App;

