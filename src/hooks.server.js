import { API_URL } from '$lib/config';

export async function handle({ event, resolve }) {
	const authToken = event.cookies.get('auth_token');

	if (authToken) {
		try {
			const response = await fetch(`${API_URL}/verify-token`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', Cookie: `auth_token=${authToken}` },
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				event.locals.user = data;
			} else {
				event.locals.user = null;
			}
		} catch (error) {
			event.locals.user = null;
			throw error;
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
}
