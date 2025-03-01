<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Comment from './Comment.svelte';

	let { fetchedUser, user } = $props();

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
			const response = await fetch(`${API_URL}/users/${username}/comments`, {
				method: 'GET',
				credentials: 'include'
			});
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

<div class="flex w-full flex-col items-center">
	{#each comments as comment}
		<a class="w-full max-w-md" href={`/post/${comment.post.id}`}>
			<div class="mb-4 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 hover:bg-zinc-800">
				<Comment {comment} postId={comment.post.id} {user} />
			</div>
		</a>
	{/each}
</div>

{#if hasNext}
	<div bind:this={target}></div>
{/if}
