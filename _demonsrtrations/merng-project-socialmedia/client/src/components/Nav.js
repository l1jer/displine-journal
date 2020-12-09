import React, { useState } from 'react';
import { Menu, Segment, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Nav() {
	const pathname = window.location.pathname;
	// // ./Login
	// This bunch of lines indicates when you input path in the browser,
	// that will activate the button to 'active'
	const path = pathname === '/' ? 'home' : pathname.substr(1);
	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<Segment inverted size='big'>
			<Menu inverted pointing secondary>
				<Menu.Item
					name='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
					as={Link}
					to='/'
				/>

				<Menu.Menu position='right'>
					<Dropdown item text='Language'>
						<Dropdown.Menu>
							<Dropdown.Item>English</Dropdown.Item>
							<Dropdown.Item>Chinese</Dropdown.Item>
							<Dropdown.Item>Spanish</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Menu.Item
						name='login'
						active={activeItem === 'login'}
						onClick={handleItemClick}
						as={Link}
						to='/login'>
						<Button primary>Login</Button>
					</Menu.Item>

					<Menu.Item
						name='register'
						active={activeItem === 'register'}
						onClick={handleItemClick}
						as={Link}
						to='/register'>
						<Button primary>Register</Button>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</Segment>
	);
}

export default Nav;
