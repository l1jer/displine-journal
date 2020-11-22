import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import FireFinder from './FireFinder';
import FireInfoContainer from './FireInfoContainer';

const Map = ({ eventData, center, zoom }) => {
	const [fireInfo, setFireInfo] = useState(null);

	const markers = eventData.map((ev) => {
		if (ev.categories[0].id === 'wildfires') {
			return (
				<FireFinder
					lat={ev.geometry[0].coordinates[1]}
					lng={ev.geometry[0].coordinates[0]}
					onClick={() =>
						setFireInfo({
							id: ev.id,
							title: ev.title,
							coordinatesLat: ev.geometry[0].coordinates[1],
							coordinatesLng: ev.geometry[0].coordinates[0],
						})
					}
				/>
			);
		}
		return null;
	});
	return (
		<div className='map'>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyBp6hkelfIJ_ytNCOsaIsdt3SmPPH4NsYk' }}
				defaultCenter={center}
				defaultZoom={zoom}>
				{markers}
			</GoogleMapReact>
			{fireInfo && <FireInfoContainer info={fireInfo} />}
		</div>
	);
};

Map.defaultProps = {
	center: {
		lat: 42.11774,
		lng: -114.22943,
	},
	zoom: 6,
};

export default Map;
