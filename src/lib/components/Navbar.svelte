<script>
	import { API_URL } from '$lib/config';

	let { user } = $props();
</script>

<div class="fixed top-0 z-50 w-full bg-zinc-900 px-4">
	<div class="z-50 flex w-full items-center justify-between py-1">
		<div class="flex text-sm">
			<a class="px-4 py-1 hover:bg-neutral-800" href="/">Vault34</a>
			<a class="px-4 py-1 hover:bg-neutral-800" href="/create">Create</a>
			<input class="mx-4 w-80 bg-zinc-800 px-2 py-1 outline-none" placeholder="Search" />
		</div>

		{#if user}
			<a class="px-4 py-1 text-sm hover:bg-neutral-800" href={`/user/${user.username}`}>Profile</a>
		{:else}
			<a class="px-4 py-1 text-sm hover:bg-neutral-800" href="/login">Login</a>
		{/if}
	</div>
</div>
