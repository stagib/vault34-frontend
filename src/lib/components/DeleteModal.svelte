<script>
	import { API_URL } from '$lib/config';
	import { clickOutside } from '$lib/utils';
	import Modal from './Modal.svelte';

	let { postId, targetId, targetType = 'post' } = $props();
	let modal = $state(null);

	export function openModal() {
		modal.openModal();
	}

	async function deletePost(postId) {
		try {
			const response = await fetch(`${API_URL}/posts/${postId}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			if (response.ok) {
				modal.closeModal();
				window.location.reload();
			}
		} catch (error) {
			throw error;
		}
	}

	async function deleteVault(vaultId) {
		try {
			const response = await fetch(`${API_URL}/vaults/${vaultId}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			if (response.ok) {
				modal.closeModal();
				window.location.reload();
			}
		} catch (error) {
			throw error;
		}
	}

	async function deleteComment(commentId, postId) {
		try {
			const response = await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			if (response.ok) {
				modal.closeModal();
				window.location.reload();
			}
		} catch (error) {
			throw error;
		}
	}

	function handleDelete(targetType, targetId) {
		if (targetType === 'post') {
			deletePost(targetId);
		} else if (targetType === 'vault') {
			deleteVault(targetId);
		} else if (targetType === 'comment') {
			deleteComment(targetId, postId);
		}
	}
</script>

<Modal bind:this={modal}>
	{#snippet content()}
		<div class="flex h-full w-full items-center justify-center bg-zinc-950 bg-opacity-85">
			<div
				class="w-full max-w-sm rounded-md border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={modal.closeModal}
			>
				<div
					class="mb-4 flex justify-between border border-x-0 border-t-0 border-zinc-600 px-4 pb-4"
				>
					<div class="font-semibold">Delete {targetType}</div>
					<button
						class="flex items-center justify-center rounded-full p-1 text-lg hover:bg-zinc-600"
						aria-label="close-button"
						onclick={modal.closeModal}
						><i class="material-symbols--close-rounded"></i>
					</button>
				</div>

				<div class="px-4 text-sm">This cannot be undone</div>

				<div class="mt-8 flex items-center justify-end gap-2 px-4">
					<button class="rounded-md px-2 py-1 text-sm hover:bg-zinc-700" onclick={modal.closeModal}
						>Cancel
					</button>
					<button
						class="rounded-md bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600"
						onclick={() => handleDelete(targetType, targetId)}>Delete</button
					>
				</div>
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
