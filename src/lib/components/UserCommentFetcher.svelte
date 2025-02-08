<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Comment from './Comment.svelte';

	let { fetchedUser } = $props();

	let page = 1;
	let loading = false;
	let comments = $state([]);
	let total = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	async function fetchFiles(username) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/users/${username}/comments`);
			const data = await response.json();

			if (response.ok) {
				comments = [...comments, ...data.items];
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
		comments = [];
		fetchFiles(fetchedUser.username);
	});
</script>

<div class="flex w-full flex-col">
	{#each comments as comment}
		<div class="mb-4 w-full max-w-md border border-zinc-600 bg-zinc-800 p-4">
			<a class="px-1 text-xs" href={`/post/${comment.post.id}`}>Post: {comment.post.id}</a>
			<Comment {comment} postId={comment.post.id} />
		</div>
	{/each}
</div>
