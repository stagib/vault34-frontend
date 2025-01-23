import { API_URL } from '$lib/config';

export async function load({ params, fetch }) {
	const postId = params.id;
	let post = null;

	try {
		const response = await fetch(`${API_URL}/posts/${postId}`, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			post = await response.json();
		}
	} catch (error) {
		throw error;
	}
	return { post };
}
