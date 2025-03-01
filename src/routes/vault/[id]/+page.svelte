<script>
	import MoreButtonVault from '$lib/components/MoreButtonVault.svelte';
	import Vault from '$lib/components/Vault.svelte';
	import VaultFetcher from '$lib/components/VaultFetcher.svelte';
	import VaultPostFetcher from '$lib/components/VaultPostFetcher.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let vault = $derived(data.vault);
	let user = $derived(data.user);
</script>

<div class="flex h-screen flex-col px-2 pb-4 pt-14 sm:items-center sm:px-4">
	<div class="mb-4 mt-4 flex px-4">
		<div class="flex flex-col">
			<div class="mb-1 font-semibold">{vault.title}</div>
			<div class="flex items-center gap-2">
				<div class="text-xs text-zinc-400">{vault.post_count} posts</div>
				<div class="text-xs text-zinc-400">|</div>
				<div class="text-xs text-zinc-400">{vault.privacy}</div>
				<div class="text-xs text-zinc-400">|</div>
				<div class="text-xs text-zinc-400">{vault.time_since}</div>
			</div>
		</div>

		{#if user && user.id === vault.user.id}
			<div class="ml-auto sm:ml-14">
				<MoreButtonVault {user} {vault} />
			</div>
		{/if}
	</div>

	<div class="h-full w-full overflow-y-auto">
		<VaultPostFetcher vaultId={vault.id} />
	</div>
</div>
