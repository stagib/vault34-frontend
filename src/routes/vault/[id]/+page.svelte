<script>
	import MoreButtonVault from '$lib/components/MoreButtonVault.svelte';
	import Vault from '$lib/components/Vault.svelte';
	import VaultFetcher from '$lib/components/VaultFetcher.svelte';
	import VaultPostFetcher from '$lib/components/VaultPostFetcher.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let vault = $derived(data.vault);
	let user = $derived(data.user);

	onMount(() => console.log(user));
</script>

{#if vault}
	<div class="flex h-screen px-4 pb-10 pt-14">
		<div class="flex max-h-full w-full max-w-72 flex-col">
			<div class="flex border border-zinc-600 bg-zinc-800 py-2 pb-8">
				<div class="flex flex-col px-4">
					<div class="mb-4 text-lg font-semibold">{vault.title}</div>
					<div class="mb-1 flex items-center gap-2">
						<div class="text-sm font-semibold">{vault.user.username}</div>
						<div class="text-xs text-zinc-300">{vault.time_since}</div>
					</div>
					<div class="flex items-center gap-2">
						<div class="text-xs text-zinc-300">{vault.post_count} posts</div>
						<div class="text-xs text-zinc-300">|</div>
						<div class="text-xs text-zinc-300">{vault.privacy}</div>
					</div>
				</div>

				<div class="ml-auto px-3">
					<MoreButtonVault {user} {vault} />
				</div>
			</div>
		</div>

		<div class="max-h-full w-full overflow-y-auto">
			<VaultPostFetcher vaultId={vault.id} />
		</div>
	</div>
{/if}
