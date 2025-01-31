<script>
	import { API_URL } from '$lib/config';
	import { clickOutside } from '$lib/utils';
	import Modal from './Modal.svelte';

	let { postId } = $props();
	let modal = $state(null);

	export function openModal() {
		modal.openModal();
	}

	async function deletePost() {
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
</script>

<Modal bind:this={modal}>
	{#snippet content()}
		<div class="flex h-full w-full items-center justify-center bg-zinc-950 bg-opacity-75">
			<div
				class="w-full max-w-sm border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={closeModal}
			>
				<div class="mb-4 border border-x-0 border-t-0 border-zinc-600 px-4 pb-4 font-semibold">
					Delete post
				</div>

				<div class="px-4 text-sm">This cannot be undone</div>

				<div class="mt-8 flex items-center justify-end gap-2 px-4">
					<button class="px-2 py-1 text-sm hover:bg-zinc-700" onclick={modal.closeModal}
						>Cancel
					</button>
					<button class="bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600" onclick={deletePost}
						>Delete</button
					>
				</div>
			</div>
		</div>
	{/snippet}
</Modal>
