import Button from '../Button/Button';
import cn from 'classnames';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';
import styles from './JournalForm.module.css';

function JournalForm({ onSubmit, currentItem, onDelete}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState; //деструктуризация, подписка на isValid
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId} = useContext(UserContext);

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

	useEffect(()=>{
		if (!currentItem) {
			dispatchForm({ type: 'CLEAN' });
			dispatchForm({type: 'SET_VALUE', payload: {userId: userId}});
		}
		dispatchForm({ type: 'SET_VALUE', payload: {...currentItem} });
	}, [currentItem, userId]); 

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
			dispatchForm({type: 'SET_VALUE', payload: {userId: userId}});
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(()=> {
		dispatchForm({ type: 'CLEAN' });
		dispatchForm({type: 'SET_VALUE', payload: {userId: userId}});
	}, [userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
	};

	const deleteJournalItem =() => {
		onDelete(currentItem.id);
		dispatchForm({ type: 'CLEAN' });
		dispatchForm({type: 'SET_VALUE', payload: {userId: userId}});
	};

	
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={cn(styles['journal-form__row'])}>
				<Input ref={titleRef} type="text" onChange={onChange} value={values.title} name='title' appearance={'title'} isValid={isValid.title}/>
				{currentItem?.id && <button type='button' className={styles['journal-form__delete']} onClick={deleteJournalItem}>
					<img src="/archive.svg" alt="delete button" />
				</button>}
			</div>
			<label className={cn(styles['journal-form__row'])}>
				<img className={styles['journal-form__img']} src="/calendar.svg" alt="calendar" />
				<span className={styles['journal-form__text']}>Дата</span>
				<Input type="date" ref={dateRef} onChange={onChange} value={values.date? new Date(values.date).toISOString().slice(0,10) : ''} name='date' isValid={isValid.date}/>
			</label>
			<label className={cn(styles['journal-form__row'])}>
				<img className={styles['journal-form__img']} src="/folder.svg" alt="folder" />
				<span className={styles['journal-form__text']}>Метки</span>
				<Input type="text" onChange={onChange} value={values.tag} name='tag' className={cn(styles['input'])} />
			</label>
			<textarea name="post" ref={postRef} onChange={onChange} value={values.post} id="" cols="30" rows="10" className={cn(styles['input'], styles['journal-form__textarea'], {
				[styles['invalid']]: !isValid.post
			})}></textarea>
			<Button>Save</Button>
		</form >
			
	);
}

export default JournalForm;