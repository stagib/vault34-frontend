<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Masonry from 'svelte-bricks';

	let posts = $state([]);
	let page = $state(1);
	let hasNext = $state(true);
	let loading = $state(false);
	let target = $state(null);

	async function fetchPosts() {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/posts?page=${page}`);
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
		fetchPosts();
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					fetchPosts();
				}
			},
			{ root: null, threshold: 0, rootMargin: '100px' }
		);

		if (hasNext) observer.observe(target);
		return () => observer.disconnect;
	});
</script>

<Masonry items={posts} gap={14} let:item>
	<a href={`/post/${item.id}`}>
		<img src={item.thumbnail} alt="" />
	</a>
</Masonry>

{#if hasNext}
	<div bind:this={target}></div>
{/if}
