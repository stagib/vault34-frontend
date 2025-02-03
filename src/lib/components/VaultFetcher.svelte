<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Vault from './Vault.svelte';

	let { username } = $props();

	let page = 1;
	let loading = false;
	let vaults = $state([]);
	let total = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	async function fetchFiles(username) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/users/${username}/vaults`);
			const data = await response.json();

			if (response.ok) {
				vaults = [...vaults, ...data.items];
				total = data.total;
				hasNext = data.page < data.pages;
				page = page + 1;
				console.log(vaults);
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
		fetchFiles(username);
	});
</script>

<div class="grid w-full grid-cols-4 gap-4">
	{#each vaults as vault}
		<Vault {vault} />
	{/each}
</div>
