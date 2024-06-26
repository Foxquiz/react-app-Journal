import { useState } from 'react';
import SelectUser from '../SelectUser/SelectUser';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';

const logos = ['/logo.svg', '/snow-globe.svg'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);

	const toggleLogo = () => {
		setLogoIndex(state=> Number(!state));
	};

	return (
		<>
			<Logo image={logos[logoIndex]}/>
			<SelectUser/>
			<Button onClick={toggleLogo}>Change logo</Button>
		</>
	);
}

export default Header;