<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Comment from './Comment.svelte';
	import CommentInput from './CommentInput.svelte';

	let { postId, user } = $props();

	let page = 1;
	let loading = false;
	let comments = $state([]);
	let totalComments = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	function updateComments(comment) {
		if (!comment) return;
		comments = [comment, ...comments];
	}

	async function fetchComments(postId) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/posts/${postId}/comments?page=${page}`, {
				credentials: 'include'
			});
			const data = await response.json();

			if (response.ok) {
				comments = [...comments, ...data.items];
				totalComments = data.total;
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
		comments = [];
		fetchComments(postId);
	});

	onMount(() => {
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

<div
	class="relative flex max-h-96 w-full flex-col overflow-hidden rounded-b-md bg-zinc-800 lg:max-h-screen lg:max-w-72 lg:rounded-l-none lg:rounded-r-md xl:max-w-xs"
>
	<div class="absolute top-0 w-full">
		<div class="flex items-center gap-2 border-b border-zinc-600 bg-zinc-800 px-4 py-2">
			<div class="text-base font-semibold">Comments</div>
			<div class="text-base text-zinc-300">{totalComments}</div>
		</div>
	</div>

	<div class="mt-12 h-full overflow-auto p-2 px-3 {user ? 'mb-12' : ''}">
		{#each comments as comment}
			<Comment {comment} {postId} {user} />
		{/each}
	</div>

	{#if hasNext}
		<div bind:this={target}></div>
	{/if}

	<div class="absolute bottom-0 w-full bg-zinc-800 pt-4">
		<CommentInput {postId} {user} onComment={updateComments} />
	</div>
</div>
