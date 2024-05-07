import { useState, useEffect } from 'react';

export function useLocalStorage(key) {
	const [data, setData] = useState();

	useEffect(() => {
		const response = JSON.parse(localStorage.getItem(key));
		if (response) {
			setData(response);
		}
	}, []); //пустой массив, поэтому действие производится один раз, не уходит в ререндер

	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
}