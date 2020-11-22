import { Icon } from '@iconify/react';
import fireAlertIcon from '@iconify/icons-mdi/fire-alert';

import React from 'react';

const Header = () => {
	return (
		<header className='header'>
			<h1>
				<Icon icon={fireAlertIcon} />
				Wildfire Tracker (Powered by NASA)
			</h1>
		</header>
	);
};

export default Header;
