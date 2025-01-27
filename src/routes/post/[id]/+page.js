import { API_URL } from '$lib/config';

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

		tags = post.tags.reduce((acc, tag) => {
			if (!acc[tag.type]) {
				acc[tag.type] = [];
			}
			acc[tag.type].push(tag);
			return acc;
		}, {});
	} catch (error) {
		throw error;
	}
	return { post, tags };
}
