import GoogleMapReact from 'google-map-react';
import FireFinder from './FireFinder';

const Map = ({ eventData, center, zoom }) => {
	const markers = eventData.map((ev) => {
		if (ev.categories[0].id === 8) {
			return (
				<FireFinder
					lat={ev.geometries[0].coordinates[1]}
					lng={ev.geometries[0].coordinates[0]}
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
		</div>
	);
};

Map.defaultProps = {
	center: {
		lat: -35.282001,
		lng: 149.128998,
	},
	zoom: 6,
};

export default Map;
