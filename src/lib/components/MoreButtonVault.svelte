<script>
	import DeleteModal from './DeleteModal.svelte';
	import DropdownMenu from './DropdownMenu.svelte';
	import ReportModal from './ReportModal.svelte';
	import VaultEditModal from './VaultEditModal.svelte';

	let { vault, user = null } = $props();
	let reportModal = $state(null);
	let editModal = $state(null);
	let deleteModal = $state(null);
</script>

<DropdownMenu>
	{#snippet button()}
		<div class="flex items-center justify-center rounded-full p-1 hover:bg-zinc-600">
			<i class="material-symbols--more-vert"></i>
		</div>
	{/snippet}

	{#snippet content()}
		<div class="absolute right-full top-0 z-20 sm:left-full">
			<div class="flex w-32 flex-col rounded-md border border-zinc-500 bg-zinc-700 p-1">
				{#if user}
					<button
						class="rounded-sm px-2 py-1 text-start text-sm hover:bg-zinc-600"
						onclick={editModal.openModal}>Edit</button
					>
					<button
						class="rounded-sm px-2 py-1 text-start text-sm hover:bg-zinc-600"
						onclick={deleteModal.openModal}>Delete</button
					>
				{:else}
					<div class="inline-block: group relative">
						<div class="w-full cursor-default rounded-sm px-2 py-1 text-start text-sm">Edit</div>
						<div class="absolute left-full top-0 hidden group-hover:block">
							<div class=" text-nowrap rounded-sm bg-zinc-600 px-2 py-1 text-sm">
								Login required
							</div>
						</div>
					</div>
					<div class="inline-block: group relative">
						<div class="w-full cursor-default rounded-sm px-2 py-1 text-start text-sm">Report</div>
						<div class="absolute left-full top-0 hidden group-hover:block">
							<div class=" text-nowrap rounded-sm bg-zinc-600 px-2 py-1 text-sm">
								Login required
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/snippet}
</DropdownMenu>

<VaultEditModal bind:this={editModal} {vault} />
<DeleteModal bind:this={deleteModal} targetType={'vault'} targetId={vault.id} />

<style>
	.material-symbols--more-vert {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 20q-.825 0-1.412-.587T10 18t.588-1.412T12 16t1.413.588T14 18t-.587 1.413T12 20m0-6q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0-6q-.825 0-1.412-.587T10 6t.588-1.412T12 4t1.413.588T14 6t-.587 1.413T12 8'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
