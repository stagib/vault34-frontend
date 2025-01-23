<script>
	import { API_URL } from '$lib/config.js';
	import { onMount } from 'svelte';

	let { data } = $props();
	let post = $derived(data.post);
	let files = $state([]);

	async function fetchFiles(postId) {
		const response = await fetch(`${API_URL}/posts/${postId}/files`);
		const data = await response.json();

		files = [...files, ...data.items];
	}
	onMount(() => fetchFiles(data.post.id));
</script>

<div class="flex h-screen pb-16">
	<div class="flex w-full max-w-64 flex-col bg-zinc-800 px-4 py-2 pr-12">
		<div class="flex gap-2 text-sm">
			<div>Likes:</div>
			<div>{post.likes}</div>
		</div>
	</div>

	<div class="max-h-screen flex-1 overflow-hidden">
		{#each files as file}
			<img class="h-full" src={file.url} alt="" />
		{/each}
	</div>

	<div class="w-full max-w-xs bg-zinc-800">Comments</div>
</div>
