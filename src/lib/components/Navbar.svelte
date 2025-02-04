<script>
	import { API_URL } from '$lib/config';

	let { user } = $props();
</script>

<div class="fixed top-0 z-50 w-full bg-zinc-900 px-4">
	<div
		class="z-50 flex w-full items-center justify-between border border-t-0 border-zinc-600 bg-zinc-800 py-1"
	>
		<div class="flex text-sm">
			<a class="bg-zinc-800 px-4 py-1 hover:bg-zinc-700" href="/">Vault34</a>
			<a class="bg-zinc-800 px-4 py-1 hover:bg-zinc-700" href="/create">Create</a>
			<input class="mx-4 w-80 bg-zinc-800 px-2 py-1 outline-none" placeholder="Search" />
		</div>

		{#if user}
			<a class="bg-zinc-800 px-4 py-1 text-sm hover:bg-zinc-700" href={`/user/${user.username}`}
				>Profile</a
			>
		{:else}
			<a class="bg-zinc-800 px-4 py-1 text-sm hover:bg-zinc-700" href="/login">Login</a>
		{/if}
	</div>
</div>
