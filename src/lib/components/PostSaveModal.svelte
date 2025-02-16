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
		modal.closeModal();
		vaultModal.openModal();
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
		<div class="flex h-full w-full items-center justify-center bg-zinc-950 bg-opacity-85">
			<div
				class="max-h-screen w-full max-w-sm overflow-auto rounded-md border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={modal.closeModal}
			>
				<div
					class="mb-4 flex justify-between border border-x-0 border-t-0 border-zinc-600 px-4 pb-4"
				>
					<div class="font-semibold">Save post</div>
					<button
						class="flex items-center justify-center rounded-full p-1 text-lg hover:bg-zinc-600"
						aria-label="close-button"
						onclick={modal.closeModal}
						><i class="material-symbols--close-rounded"></i>
					</button>
				</div>

				<div class="px-4">
					{#each vaults as vault}
						<VaultCard {vault} {postId} />
					{/each}
				</div>

				<button class="mt-8 flex w-full gap-2 bg-zinc-700" onclick={openCreateModal}>
					<div class="flex w-full items-center justify-center gap-2 px-2 py-2 hover:bg-zinc-600">
						<div class="flex items-center justify-center">
							<i class="material-symbols--add-2-rounded"></i>
						</div>
						<div class="text-sm">New vault</div>
					</div>
				</button>
			</div>
		</div>
	{/snippet}
</Modal>

<VaultCreateModal bind:this={vaultModal} {postId} redirect={true} />

<style>
	.material-symbols--close-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

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
</style>
