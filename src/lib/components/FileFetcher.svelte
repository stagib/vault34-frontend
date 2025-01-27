<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Carousel from './Carousel.svelte';

	let { postId } = $props();

	let page = 1;
	let loading = false;
	let files = $state([]);
	let total = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	async function fetchFiles(postId) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/posts/${postId}/files`);
			const data = await response.json();

			if (response.ok) {
				files = [...files, ...data.items];
				total = data.total;
				hasNext = data.page < data.pages;
				page = page + 1;
			}
		} catch (error) {
			throw error;
		}
		loading = false;
	}

	$effect(() => {
		page = 1;
		hasNext = true;
		files = [];
		fetchFiles(postId);
	});
</script>

<Carousel {files} {postId} {total} />
