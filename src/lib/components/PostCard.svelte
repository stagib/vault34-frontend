<script>
	let { post } = $props();
</script>

{#if post.thumbnail}
	<a class="overflow-hidden rounded-md bg-zinc-800" href={`/post/${post.id}`}>
		<img class="w-full" src={post.thumbnail} alt="" />
	</a>
{/if}
