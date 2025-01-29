import { API_URL } from '$lib/config';
import { verifyToken } from '$lib/utils';

export async function handle({ event, resolve }) {
	event.locals.user = await verifyToken(event.cookies.get('auth_token'));
	return resolve(event);
}
