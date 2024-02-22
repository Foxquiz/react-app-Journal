import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { useEffect, useState } from 'react';

const INITIAL_STATE = {
	title: true,
	post: true,
	date: true
};

function JournalForm({ onSubmit }) {
	const [formValidateState, setFormValidateState] = useState(INITIAL_STATE);

	useEffect(() => {
		let timerId;
		if (!formValidateState.date || !formValidateState.title || !formValidateState.post) {
			timerId = setTimeout(() => {
				setFormValidateState(INITIAL_STATE);
			}, 2000);
		}

		return () => clearTimeout(timerId);
		//когда компонент исчезает, то выполняется функция ИЛИ когда снова меняется и вызывается эффект/hook
		//убирает мерцание/повторный вызов

	}, [formValidateState]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidateState(state => ({ ...state, title: false }));
			isFormValid = false;
		} else {
			setFormValidateState(state => ({ ...state, title: true }));
		}
		if (!formProps.post?.trim().length) {
			setFormValidateState(state => ({ ...state, post: false }));
			isFormValid = false;
		} else {
			setFormValidateState(state => ({ ...state, post: true }));
		}
		if (!formProps.date) {
			setFormValidateState(state => ({ ...state, date: false }));
			isFormValid = false;
		} else {
			setFormValidateState(state => ({ ...state, date: true }));
		}
		if (!isFormValid) return;
		onSubmit(formProps);
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<input type="text" name='title' className={cn(styles['input'], styles['journal-form__title'], {
				[styles['invalid']]: !formValidateState.title
			})} />
			<label className={cn(styles['journal-form__date-row'])}>
				<img className={styles['journal-form__img']} src="/calendar.svg" alt="calendar" />
				<span className={styles['journal-form__text']}>Дата</span>
				<input type="date" name='date' className={cn(styles['input'], {
					[styles['invalid']]: !formValidateState.date
				})} />
			</label>
			<label className={cn(styles['journal-form__date-row'])}>
				<img className={styles['journal-form__img']} src="/folder.svg" alt="folder" />
				<span className={styles['journal-form__text']}>Метки</span>
				<input type="text" name='tag' className={cn(styles['input'])} />
			</label>
			<textarea name="post" id="" cols="30" rows="10" className={cn(styles['input'], styles['journal-form__textarea'], {
				[styles['invalid']]: !formValidateState.post
			})}></textarea>
			<Button text='Save' />
		</form >

	);
}

export default JournalForm;