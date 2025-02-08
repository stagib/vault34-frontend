import { API_URL } from '$lib/config';

export async function load({ params, fetch }) {
	const username = params.username;
	let fetchedUser = null;

	try {
		const response = await fetch(`${API_URL}/users/${username}`, {
			credentials: 'include'
		});

		if (response.ok) {
			fetchedUser = await response.json();
		}
	} catch (error) {
		throw error;
	}
	return { fetchedUser };
}
