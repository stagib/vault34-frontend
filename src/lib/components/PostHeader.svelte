<script>
	import MoreButtonPost from '$lib/components/MoreButtonPost.svelte';
	import PostReaction from '$lib/components/PostReaction.svelte';
	import PostSaveButton from '$lib/components/PostSaveButton.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import { onDestroy, onMount } from 'svelte';

	let { post, user, tags } = $props();
	const tagTypes = ['parody', 'character', 'artist', 'general'];
</script>

<div
	class="flex max-h-44 w-full flex-col rounded-t-md bg-zinc-800 lg:max-h-full lg:max-w-64 lg:rounded-l-md lg:rounded-r-none xl:max-w-72"
>
	<div class="flex border-b-0 border-zinc-600 py-2 pb-4 lg:border-b">
		<div class="flex w-full flex-col">
			<div class="mb-4 flex flex-col gap-1 pl-4 pr-2">
				<div class="break-all text-base font-semibold">
					{post.title}
				</div>
				<div class="flex items-center gap-2">
					<div class="text-sm font-semibold">{post.user.username}</div>
					<div class="text-xs text-zinc-300">{post.time_since}</div>
				</div>
			</div>

			<div class="flex gap-2 px-3">
				<PostReaction {post} {user} />
				<PostSaveButton {user} postId={post.id} />
			</div>
		</div>

		<div class="flex-shrink-0 pr-3">
			<MoreButtonPost {post} {user} />
		</div>
	</div>

	<div class="mt-6 hidden pb-4 lg:block">
		{#each tagTypes as type}
			{#if tags[type]}
				<div class="mb-1 flex flex-wrap items-center gap-1 px-4">
					<div class="mb-1 text-sm font-semibold">{type}:</div>
					{#each tags[type] as tag}
						<a href={`/?query=${tag.name}`}>
							<Tag {tag} />
						</a>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>
