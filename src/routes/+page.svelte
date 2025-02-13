<script>
	import PostFetcher from '$lib/components/PostFetcher.svelte';

	let { data } = $props();
	let query = $derived(data.query);
</script>

<div class="pb-10 pt-14">
	<PostFetcher {query} />
</div>
