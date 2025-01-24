<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';

	let { postId } = $props();

	let comments = $state([]);
	let page = $state(1);
	let hasNext = $state(true);
	let loading = $state(false);
	let target = $state(null);

	async function fetchComments(postId) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/posts/${postId}/comments?page=${page}`);
			const data = await response.json();

			if (response.ok) {
				comments = [...comments, ...data.items];
				hasNext = data.page < data.pages;
				page = page + 1;
			}
		} catch (error) {
			throw error;
		}
		loading = false;
		console.log(comments);
	}

	$effect(() => {
		if (postId) {
			fetchComments(postId);
		}
	});

	$effect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					fetchComments(postId);
				}
			},
			{ root: null, threshold: 0, rootMargin: '100px' }
		);

		if (hasNext) observer.observe(target);
		return () => observer.disconnect;
	});
</script>

{#each comments as comment}
	<div class="mb-4 text-sm">
		<div class="flex gap-2">
			<div class="font-semibold">{comment.user.username}</div>
			<div class="text-zinc-300">{comment.time_since}</div>
		</div>
		<div class="break-words text-sm">{comment.content}</div>
	</div>
{/each}

{#if hasNext}
	<div bind:this={target}></div>
{/if}
