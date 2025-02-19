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

		const response = await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include'
		});

		if (response.ok) {
			goto('/');
		} else {
			const data = await response.json();
			error = data.detail;
		}
	}
</script>

<div class="flex flex-col items-center gap-4 pb-10 pt-20">
	{#if error}
		<div class="flex w-full max-w-xs flex-col">
			<div
				class="break-words rounded-md border border-red-600 bg-red-400 px-4 py-1 text-sm font-semibold text-red-950"
			>
				{error}
			</div>
		</div>
	{/if}

	<div class="flex w-full max-w-xs flex-col overflow-hidden rounded-md bg-zinc-900">
		<div class="mb-8 bg-zinc-800 p-4 text-sm font-semibold">Register</div>

		<div class="px-4">
			<TextInput
				className={'mb-2 w-full rounded-sm bg-zinc-800 px-2 py-1 text-sm outline-none'}
				placeholder={'Username'}
				name={'Username'}
				minLength={3}
				maxLength={20}
				allowNumbers={true}
				required={true}
				bind:this={usernameInput}
			/>

			<TextInput
				className={'w-full rounded-sm bg-zinc-800 px-2 py-1 text-sm outline-none'}
				placeholder={'Password'}
				name={'Password'}
				minLength={6}
				maxLength={50}
				allowNumbers={true}
				allowSymbols={true}
				required={true}
				bind:this={passwordInput}
			/>
		</div>

		<div class="mt-4 px-4">
			<button class="rounded-sm bg-zinc-700 px-4 py-1 text-sm hover:bg-zinc-600" onclick={login}
				>Register
			</button>
		</div>

		<div class="mt-12 bg-zinc-800 px-4 py-4">
			<a class="flex items-center gap-2 text-xs" href="/login">
				<div class="text-zinc-400">Already have an account?</div>
				<div class="text-zinc-300">Login here</div>
			</a>
		</div>
	</div>
</div>
