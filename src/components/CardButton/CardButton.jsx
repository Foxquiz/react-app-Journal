import styles from './CardButton.module.css';

function CardButton({ children, className }) {
	const cl = styles.cardButton + (className ? ' ' + className : '');

	return (
		<button className={cl}>
			{children}
		</button>
	);
}

export default CardButton;