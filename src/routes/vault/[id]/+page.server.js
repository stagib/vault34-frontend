import { API_URL } from '$lib/config';

export async function load({ params, fetch, locals }) {
	const vaultId = params.id;
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
	return { vault, user: locals.user || null };
}
