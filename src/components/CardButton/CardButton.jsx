import styles from './CardButton.module.css';

function CardButton({ children, className, ...props }) {
	const cl = styles.cardButton + (className ? ' ' + className : '');

	return (
		<button className={cl} {...props}>
			{children}
		</button>
	);
}

export default CardButton;