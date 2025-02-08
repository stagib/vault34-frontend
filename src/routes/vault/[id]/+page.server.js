import { API_URL } from '$lib/config';
import { redirect } from '@sveltejs/kit';

export async function load({ params, fetch, locals }) {
	const vaultId = params.id;
	const user = locals.user;
	let vault = null;

	try {
		const response = await fetch(`${API_URL}/vaults/${vaultId}`, {
			credentials: 'include'
		});

		if (response.ok) {
			vault = await response.json();
		}
	} catch (error) {
		throw error;
	}

	if (vault && vault.privacy === 'private') {
		if (!user) {
			throw redirect(303, '/');
		}
		if (user.id !== vault.user.id) {
			throw redirect(303, '/');
		}
	}

	return { vault, user };
}
