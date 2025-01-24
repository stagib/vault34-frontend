<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<Navbar user={data.user} />

<div class="py-12">
	{@render children()}
</div>
