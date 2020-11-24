import axios from 'axios';

const User = async () => {
	const res = await axios.get('https://randomuser.me/api');
	const user = res.data.results[0];
	console.log(user);
	const template = `
    <div class='card'>
        <img src='${user.picture.large}' />
        <div class='card-body'>
        <h1>${user.name.title}. ${user.name.first} ${user.name.last}</h1>
        <ul>
        <li>Tel: ${user.phone}</li>
        <li>Email: ${user.email}</li>
        <li>Live in ${user.location.city} ${user.location.state}, ${user.location.country}</li>
        <li>Username: ${user.login.username}</li>
        <li>UUID: ${user.login.uuid}</li>
        <li>D.O.B: ${user.dob.date}</li>
        </ul>
        </div>
    </div>
    `;
	return template;
};

export default User;
