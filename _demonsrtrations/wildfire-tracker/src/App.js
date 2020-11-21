import { useState, useEffect } from 'react';
import Map from './components/Map';
import Loading from './components/Loading';

function App() {
	const [eventData, setEventData] = useState([]);
	const [loading, setLoading] = useState(false);

	// fetch
	useEffect(() => {
		const fetchEvents = async () => {
			setLoading(true);
			// Start loading = start fetching
			const res = await fetch(
				'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
			);
			// Fetching data till completed -> res
			const { events } = await res.json();
			// Jsonfy data from res to events

			setEventData(events);
			// EventData = {events}
			setLoading(false);
			// Stop loading = stop fetching
		};

		fetchEvents();

		console.log(eventData);
	}, []);

	return <div>{!loading ? <Map eventData={eventData} /> : <Loading />}</div>;
}

export default App;
