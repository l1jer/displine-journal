import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

function PostCard({
	post: { id, username, body, createdAt, likeCount, likes, commentCount },
}) {
	function likePost() {
		console.log('Post liked!');
	}

	function commentPost() {
		console.log('Commented post!');
	}

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					srca='https://semantic-ui.com/images/avatar/large/daniel.jpg'
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow(true)}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				{/* Like Button */}
				<Button as='div' labelPosition='right' onClick={likePost}>
					<Button color='brown' basic>
						<Icon name='heart' />
						Like
					</Button>
					<Label as='a' basic color='brown' pointing='left'>
						{likeCount}
					</Label>
				</Button>
				{/* Comment button */}
				<Button as='div' labelPosition='right' onClick={commentPost}>
					<Button color='blue' basic>
						<Icon name='comments' />
						Comment
					</Button>
					<Label as='a' basic color='blue' pointing='left'>
						{commentCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
}

export default PostCard;
