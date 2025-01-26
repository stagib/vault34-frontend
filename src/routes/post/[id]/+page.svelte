<script>
	import CommentFetcher from '$lib/components/CommentFetcher.svelte';
	import CommentInput from '$lib/components/CommentInput.svelte';
	import PostFetcher from '$lib/components/PostFetcher.svelte';
	import PostReaction from '$lib/components/PostReaction.svelte';
	import { API_URL } from '$lib/config.js';
	import { onMount } from 'svelte';

	let { data } = $props();
	let post = $derived(data.post);
	let files = $derived(data.files);
	let tags = $derived(data.tags);
</script>

<div class="flex h-screen pb-16">
	<div
		class="flex w-full max-w-64 flex-col border border-x-0 border-zinc-600 bg-zinc-800 py-2 pr-12"
	>
		<div class="flex flex-col text-sm">
			<div class="mb-4 flex flex-col gap-1 px-4">
				<div class="text-base font-semibold">{post.title}</div>
				<div class="flex items-center gap-2">
					<div class="text-sm font-semibold">{post.user.username}</div>
					<div class="text-xs text-zinc-300">{post.time_since}</div>
				</div>
			</div>

			<div class="mb-8 flex flex-col px-3">
				<PostReaction {post} />
			</div>

			{#each Object.keys(tags) as type}
				<div class="mb-4 flex flex-col px-4">
					<div class="mb-1 font-semibold">{type}:</div>
					{#each tags[type] as tag}
						<div class="flex gap-2">
							<div>{tag.name}</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="max-h-screen flex-1 overflow-hidden">
		{#each files as file}
			<img class="h-full" src={file.url} alt="" />
		{/each}
	</div>

	<div
		class="relative flex w-full max-w-xs flex-col overflow-hidden border border-r-0 border-zinc-600 bg-zinc-800"
	>
		<CommentFetcher postId={post.id} />

		<div class="absolute bottom-0 w-full bg-zinc-800 pt-4">
			<CommentInput postId={post.id} />
		</div>
	</div>
</div>

<PostFetcher />
