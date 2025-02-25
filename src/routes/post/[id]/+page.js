import { API_URL } from '$lib/config';
import { groupTags } from '$lib/utils.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const postId = params.id;
	let post = null;
	let tags = null;
	try {
		const response = await fetch(`${API_URL}/posts/${postId}`, {
			credentials: 'include'
		});

		if (!response.ok) {
			throw error(404, { code: 404, message: 'Post not found' });
		}

		post = await response.json();
		if (post) {
			if (post.tags) {
				tags = groupTags(post.tags);
			}
		}
	} catch (e) {
		if (e instanceof TypeError) {
			throw error(500, { code: 500, message: 'Network error' });
		}
		throw e;
	}
	return { post, tags };
}
