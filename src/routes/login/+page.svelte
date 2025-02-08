<script>
	import { goto } from '$app/navigation';
	import TextInput from '$lib/components/TextInput.svelte';
	import { API_URL } from '$lib/config';

	let usernameInput = $state(null);
	let passwordInput = $state(null);
	let error = $state('');

	async function login() {
		if (!usernameInput.validInput()) {
			error = usernameInput.getError();
			return;
		}

		if (!passwordInput.validInput()) {
			error = passwordInput.getError();
			return;
		}

		const username = usernameInput.getValue();
		const password = passwordInput.getValue();

		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include'
		});

		if (response.ok) {
			goto('/');
			window.location.reload();
		} else {
			const data = await response.json();
			error = data.detail;
		}
	}
</script>

<div class="flex gap-4 px-4 pb-10 pt-14">
	<div class="flex w-full max-w-xs flex-col border border-zinc-600 bg-zinc-800 p-4">
		<div class="mb-8 text-sm font-semibold">Login</div>

		<TextInput
			className={'mb-2 w-full bg-zinc-700 px-2 py-1 text-sm outline-none'}
			placeholder={'Username'}
			name={'Username'}
			allowNumbers={true}
			allowSymbols={true}
			required={true}
			bind:this={usernameInput}
		/>

		<TextInput
			className={'w-full bg-zinc-700 px-2 py-1 text-sm outline-none'}
			placeholder={'Password'}
			name={'Password'}
			allowNumbers={true}
			allowSymbols={true}
			required={true}
			bind:this={passwordInput}
		/>

		<div class="mt-2">
			<button class="bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600" onclick={login}
				>Login
			</button>
		</div>

		<div class="mt-20 pb-2">
			<a class="flex items-center gap-2 text-xs" href="/register">
				<div class="text-zinc-300">Don't have an account?</div>
				<div class="">Register here</div>
			</a>
		</div>
	</div>

	{#if error}
		<div class="flex w-full max-w-xs flex-col">
			<div
				class="break-words border border-red-600 bg-red-400 px-4 py-1 text-sm font-semibold text-red-950"
			>
				{error}
			</div>
		</div>
	{/if}
</div>
