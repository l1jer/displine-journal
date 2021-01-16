import { ValuesOfCorrectTypeRule } from 'graphql';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';

function PostForm() {
	// Create values for returning
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: '',
	});

	// 'Create a post' function uses mutation
	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(_, result) {
			console.log(result);
			values.body = '';
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<Form onSubmit={onSubmit}>
			<h2>Create a post:</h2>
			<Form.Field>
				<Form.Input
					placeholder='create a post'
					name='body'
					onChange={onChange}
					value={values.body}
				/>
				<Button type='submit' color='red'>
					Submit
				</Button>
			</Form.Field>
		</Form>
	);
}

const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createAt
			username
			likes {
				id
				username
				createAt
			}
			likeCountcomments {
				id
				body
				username
				createAt
			}
			commentCount
		}
	}
`;

export default PostForm;
