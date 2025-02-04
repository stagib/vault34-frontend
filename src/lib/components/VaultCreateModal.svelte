<script>
	import { API_URL } from '$lib/config';
	import { clickOutside } from '$lib/utils';
	import Modal from './Modal.svelte';
	import TextInput from './TextInput.svelte';

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
		modal.openModal();
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
		<div class="flex h-full w-full flex-col items-center justify-center bg-zinc-950 bg-opacity-75">
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
				class="max-h-screen w-full max-w-sm overflow-auto border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={modal.closeModal}
			>
				<div class="mb-4 border border-x-0 border-t-0 border-zinc-600 px-4 pb-4 font-semibold">
					Create vault
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
							class="h-4 w-4 border border-zinc-600"
							class:bg-zinc-50={privacy === 'private'}
						></div>
						<div class="text-sm">Keep this vault private</div>
					</button>
				</div>

				<div class="mt-10 flex items-center justify-end gap-2 px-4">
					<button class="px-2 py-1 text-sm hover:bg-zinc-700" onclick={modal.closeModal}
						>Cancel</button
					>
					<button class="bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600" onclick={createVault}
						>Create</button
					>
				</div>
			</div>
		</div>
	{/snippet}
</Modal>
