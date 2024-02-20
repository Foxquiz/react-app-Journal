import './App.css';
// import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

const INITIAL_DATA = [
	// {
	// 	id: 1,
	// 	title: 'Preparation for courses updating',
	// 	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim tortor tortor, eget porta risus molestie nec.',
	// 	date: new Date()
	// },
	// {
	// 	id: 2,
	// 	title: 'Summer trip',
	// 	text: 'Aliquam accumsan nulla lectus, eu venenatis metus tempus et. Donec id mauris ultrices, imperdiet libero eu, posuere massa. Suspendisse in arcu eu ex rhoncus commodo id eu libero. ',
	// 	date: new Date()
	// }
];

function App() {
	const [items, setItems] = useState(INITIAL_DATA);

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			text: item.text,
			title: item.title,
			date: new Date(item.date),
			id: Math.max(...oldItems.map(i => i.id)) + 1
		}]);
	};

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					{items.length === 0 && <p>List of memories is empty, please add the first one</p>}
					{items.length > 0 && items.sort(sortItems).map(el => (
						<CardButton key={el.id}>
							<JournalItem
								title={el.title}
								text={el.text}
								date={el.date}
							/>
						</CardButton>
					))}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
