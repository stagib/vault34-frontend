<script>
	import CommentFetcher from '$lib/components/CommentFetcher.svelte';
	import CommentInput from '$lib/components/CommentInput.svelte';
	import FileFetcher from '$lib/components/FileFetcher.svelte';
	import MoreButtonPost from '$lib/components/MoreButtonPost.svelte';
	import PostFetcher from '$lib/components/PostFetcher.svelte';
	import PostReaction from '$lib/components/PostReaction.svelte';
	import PostSaveButton from '$lib/components/PostSaveButton.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import { API_URL } from '$lib/config.js';

	let { data } = $props();
	let user = $derived(data.user);
	let post = $derived(data.post);
	let tags = $derived(data.tags);

	const tagTypes = ['parody', 'character', 'artist', 'general'];
</script>

{#if post}
	<div class="mx-4 flex h-screen pb-10 pt-14">
		<div class="mr-4 flex w-full max-w-72 flex-col border border-zinc-600 bg-zinc-800">
			<div class="flex border-b border-zinc-600 py-2 pb-4">
				<div class="flex w-full flex-col">
					<div class="mb-4 flex flex-col gap-1 px-4">
						<div class="text-base font-semibold">{post.title}</div>
						<div class="flex items-center gap-2">
							<div class="text-sm font-semibold">{post.user.username}</div>
							<div class="text-xs text-zinc-300">{post.time_since}</div>
						</div>
					</div>

					<div class="flex gap-2 px-3">
						<PostReaction {post} />
						<PostSaveButton />
					</div>
				</div>

				<div class="pr-3">
					<MoreButtonPost {post} {user} />
				</div>
			</div>

			<div class="mt-6">
				{#each tagTypes as type}
					{#if tags[type]}
						<div class="mb-4 flex flex-wrap items-center gap-2 px-4">
							<div class="mb-1 text-sm font-semibold">{type}:</div>
							{#each tags[type] as tag}
								<a href="/">
									<Tag {tag} />
								</a>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<FileFetcher postId={post.id} />

		<div
			class="relative ml-4 flex w-full max-w-xs flex-col overflow-hidden border border-zinc-600 bg-zinc-800"
		>
			<CommentFetcher postId={post.id} />

			<div class="absolute bottom-0 w-full bg-zinc-800 pt-4">
				<CommentInput postId={post.id} />
			</div>
		</div>
	</div>

	<PostFetcher />
{/if}
