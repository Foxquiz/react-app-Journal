import './JournalItem.css';

function JournalItem({title, post, date, tag}) {
	const formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className='journal-item__title'>{title}</h2>
			{tag && <p className='journal-item__tag'>{tag}</p>}
			<div className='journal-item__body'>
				<div className='journal-item__date'>{formattedDate}</div>
				<div className='journal-item__text'>{post}</div>
			</div>
		</>
	);
}

export default JournalItem;