import { Icon } from '@iconify/react';
import fireAlertIcon from '@iconify/icons-mdi/fire-alert';

// Fire Alert Icon for location where is on fire
const FireFinder = ({ lat, lng, onClick }) => {
	return (
		<div className='fire-finder' onClick={onClick}>
			<Icon icon={fireAlertIcon} className='fire-alert-icon' />
		</div>
	);
};

export default FireFinder;
