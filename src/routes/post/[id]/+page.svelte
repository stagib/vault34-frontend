<script>
	import CommentFetcher from '$lib/components/CommentFetcher.svelte';
	import FileFetcher from '$lib/components/FileFetcher.svelte';
	import PostFetcher from '$lib/components/PostFetcher.svelte';
	import PostHeader from '$lib/components/PostHeader.svelte';

	let { data } = $props();
	let user = $derived(data.user);
	let post = $derived(data.post);
	let tags = $derived(data.tags);
</script>

{#if post}
	<div class="mx-2 pb-8 pt-14 sm:mx-4 lg:h-screen">
		<div class="flex h-full flex-col rounded-md border border-zinc-700 lg:flex-row">
			<PostHeader {user} {post} {tags} />
			<FileFetcher postId={post.id} />
			<CommentFetcher postId={post.id} {user} />
		</div>
	</div>

	<PostFetcher />
{/if}
