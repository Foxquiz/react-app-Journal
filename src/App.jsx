import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';

// const INITIAL_DATA = [
// {
// 	"id": 1,
// 	"title": "Preparation for courses updating",
// 	"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim tortor tortor, eget porta risus molestie nec.",
// 	"date": "2022/02/24"
// },
// {
// 	"id": 2,
// 	"title": "Summer trip",
// 	"text": "Aliquam accumsan nulla lectus, eu venenatis metus tempus et. Donec id mauris ultrices, imperdiet libero eu, posuere massa. Suspendisse in arcu eu ex rhoncus commodo id eu libero. ",
// 	"date": "2022/02/24"
// }
// ];

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []); //пустой массив, поэтому действие производится один раз, не уходит в ререндер

	useEffect(() => {
		if (items.length) { //проверки внутри эффекта, эффект/hook всегда на "верхнем уровне"
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]); //отслеживаем изменение items, выполнение эффекта производится при изменении

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			post: item.post,
			title: item.title,
			date: new Date(item.date),
			id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
		}]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={items} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
