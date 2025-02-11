<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Masonry from './Masonry.svelte';

	let { fetchedUser } = $props();

	let page = 1;
	let loading = false;
	let posts = $state([]);
	let total = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	async function fetchUserPosts(username) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/users/${username}/posts/reactions?type=like`);
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
		fetchUserPosts(fetchedUser.username);
	});
</script>

<Masonry items={posts}>
	{#each posts as post}
		<a href={`/post/${post.id}`}>
			<img src={post.thumbnail} alt="" />
		</a>
	{/each}
</Masonry>

{#if hasNext}
	<div bind:this={target}></div>
{/if}
