import { API_URL } from '$lib/config';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch, url }) {
	const username = params.username;
	const view = url.searchParams.get('view');
	let fetchedUser = null;

	try {
		const response = await fetch(`${API_URL}/users/${username}`, {
			credentials: 'include'
		});

		if (response.ok) {
			fetchedUser = await response.json();
		} else {
			throw error(404, { code: 404, message: 'User not found' });
		}
	} catch (e) {
		if (e instanceof TypeError) {
			throw error(500, { code: 500, message: 'Network error' });
		}
		throw e;
	}
	return { fetchedUser, view };
}
