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
		<div class="flex h-full w-full items-center justify-center bg-zinc-950 bg-opacity-85">
			<div
				class="w-full max-w-sm rounded-md border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={closeModal}
			>
				<div
					class="mb-4 flex justify-between border border-x-0 border-t-0 border-zinc-600 px-4 pb-4"
				>
					<div class="font-semibold">Create report</div>
					<button
						class="flex items-center justify-center rounded-full p-1 text-lg hover:bg-zinc-600"
						aria-label="close-button"
						onclick={modal.closeModal}
						><i class="material-symbols--close-rounded"></i>
					</button>
				</div>
				{#if !sent}
					<div class="px-4">
						<textarea
							class="w-full resize-none rounded-md border border-zinc-600 bg-zinc-800 p-2 text-sm outline-none"
							rows="5"
							placeholder="Detail"
							bind:value={detail}
						></textarea>
					</div>

					<div class="mt-4 flex items-center justify-end gap-2 px-4">
						<button class="rounded-md px-2 py-1 text-sm hover:bg-zinc-700" onclick={closeModal}
							>Cancel
						</button>
						<button
							class="rounded-md bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600"
							onclick={createReport}
							>Submit
						</button>
					</div>
				{:else}
					<div class="px-4 text-sm">Report sent</div>
					<div class="mt-2 flex items-center justify-end px-4">
						<button class="rounded-md px-2 py-1 text-sm hover:bg-zinc-700" onclick={closeModal}
							>Close</button
						>
					</div>
				{/if}
			</div>
		</div>
	{/snippet}
</Modal>

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
</style>
