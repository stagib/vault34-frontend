<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Masonry from './Masonry.svelte';
	import PostCard from './PostCard.svelte';

	let { vaultId } = $props();

	let page = 1;
	let loading = false;
	let posts = $state([]);
	let total = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	async function fetchPosts(vaultId) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/vaults/${vaultId}/posts`);
			const data = await response.json();

			if (response.ok) {
				posts = [...posts, ...data.items];
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
		posts = [];
		fetchPosts(vaultId);
	});
</script>

<Masonry items={posts}>
	{#each posts as post}
		<PostCard {post} />
	{/each}
</Masonry>

{#if hasNext}
	<div bind:this={target}></div>
{/if}
