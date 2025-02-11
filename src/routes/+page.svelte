<script>
	import { page } from '$app/stores';
	import PostFetcher from '$lib/components/PostFetcher.svelte';

	let { data } = $props();
	let query = $derived($page.url.searchParams.get('query'));
</script>

<div class="pb-10 pt-14">
	<PostFetcher {query} />
</div>
