import styles from './SelectUser.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
	const {userId, setUserId} = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
		console.log(e.target.value);
	};
	
	return (
		<select className={styles['select']} name='user' id='user' value={userId} onChange={changeUser}>
			<option value='1'>Fox</option>
			<option value='2'>Cat</option>
		</select>
	);
}

export default SelectUser;