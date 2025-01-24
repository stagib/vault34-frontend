import { API_URL } from '$lib/config';

export async function load({ params, fetch }) {
	const postId = params.id;
	let post = null;
	let files = null;
	let tags = null;

	try {
		const [postData, fileData] = await Promise.all([
			fetch(`${API_URL}/posts/${postId}`, {
				credentials: 'include'
			}).then((res) => res.json()),
			fetch(`${API_URL}/posts/${postId}/files`).then((res) => res.json())
		]);

		post = postData;
		files = fileData.items;

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
	return { post, files, tags };
}
