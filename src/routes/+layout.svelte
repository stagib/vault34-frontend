<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<Navbar user={data.user} />
{@render children()}
