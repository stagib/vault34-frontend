import { API_URL } from '$lib/config';
import { groupTags } from '$lib/utils.js';

export async function load({ params, fetch }) {
	const postId = params.id;
	let post = null;
	let tags = null;
	try {
		const response = await fetch(`${API_URL}/posts/${postId}`, {
			credentials: 'include'
		});

		if (response.ok) {
			post = await response.json();
		}

		if (post.tags) {
			tags = groupTags(post.tags);
		}
	} catch (error) {
		throw error;
	}
	return { post, tags };
}
