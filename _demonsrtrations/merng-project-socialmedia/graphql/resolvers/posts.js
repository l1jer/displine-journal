const { AuthenticationError, UserInputError } = require('apollo-server');

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
		// --- --- Creation --- ---
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

		// --- --- Deletion --- ---
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

		async likePost(_, { postId }, context) {
			const { username } = checkAuth(context);

			const post = await Post.findById(postId);
			if (post) {
				if (post.likes.find((like) => like.username === username)) {
					// Unlike liked post
					post.likes = post.likes.filter((like) => like.username !== username);
				} else {
					// like unliked post
					post.likes.push({
						username,
						createdAt: new Date().toISOString(),
					});
				}

				await post.save();
				return post;
			} else throw new UserInputError('Post was not found');
		},
	},
};
