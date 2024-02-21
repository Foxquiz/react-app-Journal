import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ items }) {

	const sortItems = (a, b) => {
		if (a.date < b.date) return 1;
		return -1;
	};

	if (items.length === 0) {
		return <p>List of memories is empty, please add the first one</p>;
	}
	if (items.length > 0) {
		return (
			<div className='journal-list'>
				{items.sort(sortItems).map(el => (
					<CardButton key={el.id}>
						<JournalItem
							title={el.title}
							text={el.text}
							date={el.date}
						/>
					</CardButton>
				))}
			</div>
		);
	}

}

export default JournalList;