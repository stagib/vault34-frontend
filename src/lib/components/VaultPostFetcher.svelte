<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Masonry from 'svelte-bricks';

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

<div class="mx-4">
	<Masonry items={posts} gap={14} let:item={post}>
		<a href={`/post/${post.id}`}>
			<img src={post.thumbnail} alt="" />
		</a>
	</Masonry>
</div>

{#if hasNext}
	<div bind:this={target}></div>
{/if}
