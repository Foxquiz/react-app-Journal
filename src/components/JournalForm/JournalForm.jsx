import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState; //деструктуризация, подписка на isValid
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.title || !isValid.post) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}

		return () => clearTimeout(timerId);
		//когда компонент исчезает, то выполняется функция ИЛИ когда снова меняется и вызывается эффект/hook
		//убирает мерцание/повторный вызов

	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAN' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<Input ref={titleRef} type="text" onChange={onChange} value={values.title} name='title' appearance={'title'} isValid={isValid.title}/>
			<label className={cn(styles['journal-form__date-row'])}>
				<img className={styles['journal-form__img']} src="/calendar.svg" alt="calendar" />
				<span className={styles['journal-form__text']}>Дата</span>
				<Input type="date" ref={dateRef} onChange={onChange} value={values.date} name='date' isValid={isValid.date}/>
			</label>
			<label className={cn(styles['journal-form__date-row'])}>
				<img className={styles['journal-form__img']} src="/folder.svg" alt="folder" />
				<span className={styles['journal-form__text']}>Метки</span>
				<Input type="text" onChange={onChange} value={values.tag} name='tag' className={cn(styles['input'])} />
			</label>
			<textarea name="post" ref={postRef} onChange={onChange} value={values.post} id="" cols="30" rows="10" className={cn(styles['input'], styles['journal-form__textarea'], {
				[styles['invalid']]: !isValid.post
			})}></textarea>
			<Button text='Save' />
		</form >

	);
}

export default JournalForm;