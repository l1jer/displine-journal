import pending from './pending.gif';

const Loading = () => {
	return (
		<div className='loading'>
			<img src={pending} alt='Loading' />
			<h1>Processing Data ...</h1>
		</div>
	);
};

export default Loading;
