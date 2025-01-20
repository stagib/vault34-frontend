<script>
	let { data } = $props();
	let user = $derived(data.user);
</script>

<div>{user.username}</div>
