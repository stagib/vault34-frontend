<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/config';
	import { clickOutside } from '$lib/utils';
	import Modal from './Modal.svelte';
	import TextInput from './TextInput.svelte';

	let { postId, redirect = false } = $props();

	let modal = $state(null);
	let titleInput = $state(null);
	let privacy = $state('public');
	let error = $state('');
	let apiError = $state('');

	function togglePrivacy() {
		if (privacy === 'private') {
			privacy = 'public';
		} else {
			privacy = 'private';
		}
	}

	export function openModal() {
		error = '';
		apiError = '';
		privacy = 'public';
		modal.openModal();
	}

	async function saveToVault(vaultId, postId) {
		try {
			const response = await fetch(`${API_URL}/vaults/${vaultId}/posts/${postId}`, {
				method: 'POST',
				credentials: 'include'
			});
		} catch (error) {
			throw error;
		}
	}

	async function createVault() {
		if (!titleInput.validInput()) {
			error = titleInput.getError();
			return;
		}

		const title = titleInput.getValue();

		try {
			const response = await fetch(`${API_URL}/vaults`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, privacy }),
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				if (postId) await saveToVault(data.id, postId);
				if (redirect) goto(`/vault/${data.id}`);

				modal.closeModal();
			} else {
				const data = await response.json();
				apiError = data.detail;
			}
		} catch (error) {
			throw error;
		}
	}
</script>

<Modal bind:this={modal}>
	{#snippet content()}
		<div class="flex h-full w-full flex-col items-center justify-center bg-zinc-950 bg-opacity-85">
			{#if apiError}
				<div class="w-full max-w-sm">
					<div
						class="mb-2 w-full break-words border border-t-0 border-red-600 bg-red-400 px-2 py-1 text-sm font-semibold text-red-950"
					>
						{apiError}
					</div>
				</div>
			{/if}

			<div
				class="max-h-screen w-full max-w-sm overflow-auto rounded-md border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={modal.closeModal}
			>
				<div
					class="mb-4 flex justify-between border border-x-0 border-t-0 border-zinc-600 px-4 pb-4"
				>
					<div class="font-semibold">Create vault</div>
					<button
						class="flex items-center justify-center rounded-full p-1 text-lg hover:bg-zinc-600"
						aria-label="close-button"
						onclick={modal.closeModal}
						><i class="material-symbols--close-rounded"></i>
					</button>
				</div>

				<div class="px-4">
					<div class="mb-2 text-sm font-semibold text-zinc-300">Title</div>
					<div class="border-b-0" class:border-red-600={error} class:border={error}>
						<TextInput
							className={'w-full bg-zinc-700 px-2 py-1 outline-none'}
							placeholder={'Title'}
							name={'Title'}
							required={true}
							minLength={1}
							maxLength={50}
							allowNumbers={true}
							allowSymbols={true}
							bind:this={titleInput}
						/>
					</div>
				</div>
				<div class="h-4 px-4">
					{#if error}
						<div
							class="break-words border border-t-0 border-red-600 bg-red-400 px-2 py-1 text-xs font-semibold text-red-950"
						>
							{error}
						</div>
					{/if}
				</div>

				<div class="mt-4 px-4">
					<button class="flex items-center gap-2" onclick={togglePrivacy}>
						<div
							class="flex h-5 w-5 items-center justify-center rounded-md border border-zinc-600 {privacy ===
							'private'
								? 'bg-zinc-100'
								: ''}"
						>
							{#if privacy === 'private'}
								<div class="flex h-full w-full items-center justify-center text-zinc-950">
									<i class="material-symbols--check-rounded"></i>
								</div>
							{/if}
						</div>
						<div class="text-sm">Keep this vault private</div>
					</button>
				</div>

				<div class="mt-10 flex items-center justify-end gap-2 px-4">
					<button class="rounded-md px-2 py-1 text-sm hover:bg-zinc-700" onclick={modal.closeModal}
						>Cancel</button
					>
					<button
						class="rounded-md bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600"
						onclick={createVault}>Create</button
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

	.material-symbols--check-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
