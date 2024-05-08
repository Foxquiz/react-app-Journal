import './JournalItem.css';

function JournalItem({title, post, date}) {
	const formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className='journal-item__title'>{title}</h2>
			<div className='journal-item__body'>
				<div className='journal-item__date'>{formattedDate}</div>
				<div className='journal-item__text'>{post}</div>
			</div>
		</>
	);
}

export default JournalItem;