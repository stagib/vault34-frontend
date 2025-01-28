<script>
	import { API_URL } from '$lib/config';
	import { clickOutside } from '$lib/utils';
	import Modal from './Modal.svelte';

	let { targetId, targetType } = $props();
	let modal = $state(null);
	let detail = $state('');
	let sent = $state(false);

	export function openModal() {
		modal.openModal();
	}

	function closeModal() {
		sent = false;
		detail = '';
		modal.closeModal();
	}

	async function createReport() {
		try {
			const response = await fetch(`${API_URL}/reports`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ target_id: targetId, target_type: targetType, detail }),
				credentials: 'include'
			});

			if (response.ok) {
				sent = true;
				detail = '';
			}
		} catch (error) {
			throw error;
		}
	}
</script>

<Modal bind:this={modal}>
	{#snippet content()}
		<div class="flex h-full w-full items-center justify-center bg-zinc-950 bg-opacity-75">
			<div
				class="w-full max-w-sm border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={closeModal}
			>
				<div class="mb-4 border border-x-0 border-t-0 border-zinc-600 px-4 pb-4 font-semibold">
					Create report
				</div>
				{#if !sent}
					<div class="px-4">
						<textarea
							class="w-full resize-none border border-zinc-600 bg-zinc-800 p-2 text-sm outline-none"
							rows="5"
							placeholder="Detail"
							bind:value={detail}
						></textarea>
					</div>

					<div class="mt-2 flex items-center justify-end gap-2 px-4">
						<button class="px-2 py-1 text-sm hover:bg-zinc-700" onclick={closeModal}
							>Cancel
						</button>
						<button class="bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600" onclick={createReport}
							>Submit
						</button>
					</div>
				{:else}
					<div class="px-4 text-sm">Report sent</div>
					<div class="mt-2 flex items-center justify-end px-4">
						<button class="px-2 py-1 text-sm hover:bg-zinc-700" onclick={closeModal}>Close</button>
					</div>
				{/if}
			</div>
		</div>
	{/snippet}
</Modal>
