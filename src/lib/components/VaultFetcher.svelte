<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Vault from './Vault.svelte';
	import VaultCreateModal from './VaultCreateModal.svelte';

	let { fetchedUser, user } = $props();

	let createModal = $state(null);

	let page = 1;
	let loading = false;
	let vaults = $state([]);
	let total = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	async function fetchVaults(username) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/users/${username}/vaults`, {
				method: 'GET',
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				vaults = [...vaults, ...data.items];
				total = data.total;
				hasNext = data.page < data.pages;
				page = page + 1;
			}
		} catch (error) {
			throw error;
		}
		loading = false;
	}

	$effect(() => {
		page = 1;
		hasNext = true;
		vaults = [];
		fetchVaults(fetchedUser.username);
	});
</script>

<div class="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6">
	{#each vaults as vault}
		<Vault {vault} {user} />
	{/each}

	<!-- 	{#if user && user.id === fetchedUser.id}
		<div>
			<button
				class="mb-4 flex items-center justify-center gap-1 rounded-md bg-zinc-800 p-2 px-2 text-sm hover:bg-zinc-700"
				onclick={createModal.openModal}
			>
				<i class="material-symbols--add-2-rounded"></i>
				<div class="text-xs">New vault</div>
			</button>
		</div>
	{/if} -->
</div>

<VaultCreateModal bind:this={createModal} />

<!-- <style>
	.material-symbols--add-2-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style> -->
