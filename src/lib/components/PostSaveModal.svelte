<script>
	import { API_URL } from '$lib/config';
	import { clickOutside } from '$lib/utils';
	import Modal from './Modal.svelte';
	import VaultCard from './VaultCard.svelte';
	import VaultCreateModal from './VaultCreateModal.svelte';

	let { user, postId } = $props();

	let modal = $state(null);
	let vaultModal = $state(null);

	let page = 1;
	let loading = false;
	let vaults = $state([]);
	let total = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	export function openModal() {
		page = 1;
		hasNext = true;
		vaults = [];
		modal.openModal();
		fetchVaults(user.username);
	}

	function openCreateModal() {
		vaultModal.openModal();
		modal.closeModal();
	}

	async function fetchVaults(username) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/users/${username}/vaults?post_id=${postId}`);
			const data = await response.json();

			if (response.ok) {
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
</script>

<Modal bind:this={modal}>
	{#snippet content()}
		<div class="flex h-full w-full items-center justify-center bg-zinc-950 bg-opacity-75">
			<div
				class="max-h-screen w-full max-w-sm overflow-auto border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={modal.closeModal}
			>
				<div class="mb-4 border border-x-0 border-t-0 border-zinc-600 px-4 pb-4 font-semibold">
					Save post
				</div>

				<div class="px-4">
					{#each vaults as vault}
						<VaultCard {vault} {postId} />
					{/each}
				</div>

				<div class="mt-4 flex items-center justify-end gap-2 px-4">
					<button class="bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600" onclick={openCreateModal}
						>New vault
					</button>
				</div>
			</div>
		</div>
	{/snippet}
</Modal>

<VaultCreateModal bind:this={vaultModal} {postId} redirect={true} />
