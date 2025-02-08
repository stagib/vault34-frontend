<script>
	import DeleteModal from './DeleteModal.svelte';
	import DropdownMenu from './DropdownMenu.svelte';
	import ReportModal from './ReportModal.svelte';

	let { user = null, comment } = $props();
	let reportModal = $state(null);
	let deleteModal = $state(null);

	function test() {
		console.log('sdf');
	}
</script>

<DropdownMenu>
	{#snippet button()}
		<div class="flex items-center justify-center bg-zinc-700 p-1 hover:bg-zinc-600">
			<i class="material-symbols--more-horiz"></i>
		</div>
	{/snippet}

	{#snippet content()}
		<div class="absolute left-full top-0 z-20">
			<div class="flex w-32 flex-col border border-zinc-600 bg-zinc-700 p-1">
				{#if user}
					<button
						class="px-2 py-1 text-start text-sm hover:bg-zinc-600"
						onclick={reportModal.openModal}>Report</button
					>
					<button
						class="px-2 py-1 text-start text-sm hover:bg-zinc-600"
						onclick={deleteModal.openModal}>Delete</button
					>
				{:else}
					<div class="inline-block: group relative">
						<div class="w-full cursor-default px-2 py-1 text-start text-sm">Report</div>
						<div class="absolute right-full top-0 hidden group-hover:block">
							<div class="text-nowrap bg-zinc-600 px-2 py-1 text-sm">Login required</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/snippet}
</DropdownMenu>

<DeleteModal
	bind:this={deleteModal}
	targetId={comment.id}
	targetType={'comment'}
	postId={comment.post.id}
/>
<ReportModal bind:this={reportModal} targetId={comment.id} targetType={'comment'} />

<style>
	.material-symbols--more-horiz {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M6 14q-.825 0-1.412-.587T4 12t.588-1.412T6 10t1.413.588T8 12t-.587 1.413T6 14m6 0q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m6 0q-.825 0-1.412-.587T16 12t.588-1.412T18 10t1.413.588T20 12t-.587 1.413T18 14'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
