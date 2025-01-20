<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/config';

	let username = $state('');
	let password = $state('');

	async function login() {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include'
		});

		if (response.ok) {
			goto('/');
		}
	}
</script>

<div class="flex flex-col">
	<div class="mb-4 text-sm font-semibold">Login</div>

	<input
		class="w-80 bg-zinc-800 px-2 py-1 outline-none"
		placeholder="Username"
		bind:value={username}
	/>
	<input
		class="w-80 bg-zinc-800 px-2 py-1 outline-none"
		placeholder="Password"
		bind:value={password}
	/>

	<div class="mt-2">
		<button class="bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600" onclick={login}>Login</button>
	</div>
</div>
