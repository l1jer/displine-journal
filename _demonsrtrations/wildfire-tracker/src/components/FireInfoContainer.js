const FireInfoContainer = ({ info }) => {
	return (
		<div className='fire-info-container'>
			<h2>Incident Location Info</h2>
			<ul>
				<li>
					ID: <strong>{info.id}</strong>
				</li>
				<li>
					Title: <strong>{info.title}</strong>
				</li>
				<li>
					Lat: <strong>{info.coordinatesLat}</strong> , Lng:
					<strong>{info.coordinatesLng}</strong>
				</li>
			</ul>
		</div>
	);
};

export default FireInfoContainer;
