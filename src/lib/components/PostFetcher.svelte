<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Masonry from './Masonry.svelte';
	import PostCard from './PostCard.svelte';

	let { query } = $props();

	let page = 1;
	let loading = false;
	let posts = $state([]);
	let hasNext = $state(true);
	let target = $state(null);

	async function fetchPosts(q) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/posts?page=${page}${q ? `&query=${q}` : ''}`);
			const data = await response.json();

			if (response.ok) {
				posts = [...posts, ...data.items];
				hasNext = data.page < data.pages;
				page = page + 1;
			}
		} catch (error) {
			throw error;
		}
		loading = false;
	}

	onMount(() => {
		fetchPosts(query);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					fetchPosts(query);
				}
			},
			{ root: null, threshold: 0, rootMargin: '100px' }
		);

		if (hasNext) observer.observe(target);
		return () => observer.disconnect;
	});

	$effect(() => {
		page = 1;
		hasNext = true;
		posts = [];
		fetchPosts(query);
	});
</script>

<div class="mx-2 sm:mx-4">
	<Masonry items={posts}>
		{#each posts as post}
			<PostCard {post} />
		{/each}
	</Masonry>
</div>

{#if hasNext}
	<div bind:this={target}></div>
{/if}
