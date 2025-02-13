export async function load({ url }) {
	const query = url.searchParams.get('query');
	return { query };
}
