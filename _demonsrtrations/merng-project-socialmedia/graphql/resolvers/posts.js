const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
	Query: {
		async getPosts() {
			// Display all posts
			try {
				const posts = await Post.find().sort({ createdAt: -1 }); // Descending order
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getPost(_, { postId }) {
			// Search post by ID
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error('Post not found!');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	// Here can be done wrong easily, do NOT put Mutation in Query
	Mutation: {
		async createPost(_, { body }, context) {
			// Here is the context body been accessed via index.js where forward req body to context

			const user = checkAuth(context);
			// If there is no error been thrown which means this is working functionally
			console.log(user);

			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
			});

			const post = await newPost.save();

			return post;
		},
		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (user.username === post.username) {
					await post.delete();
					return 'Post deletion excuted successfully!';
				} else {
					throw new AuthenticationError(
						'Post deletion cannot be done due to unknown authority!'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
