<script>
	import DeleteModal from './DeleteModal.svelte';
	import DropdownMenu from './DropdownMenu.svelte';
	import ReportModal from './ReportModal.svelte';

	let { user = null, comment } = $props();
	let reportModal = $state(null);
	let deleteModal = $state(null);
</script>

<DropdownMenu>
	{#snippet button()}
		<div class="flex items-center justify-center rounded-full p-1 hover:bg-zinc-600">
			<i class="material-symbols--more-vert"></i>
		</div>
	{/snippet}

	{#snippet content()}
		<div class="absolute right-full top-0 z-20">
			<div class="flex w-32 flex-col rounded-md border border-zinc-500 bg-zinc-700 p-1">
				<button
					class="group relative flex items-center rounded-md px-2 py-1 text-start text-sm hover:bg-zinc-600"
					disabled={!user}
					onclick={reportModal.openModal}
				>
					<div class="mr-2 flex items-center justify-center text-base">
						<i class="material-symbols--flag-2-outline-rounded"></i>
					</div>
					<div class="text-sm">Report</div>

					{#if !user}
						<div class="absolute right-full top-0 hidden group-hover:block">
							<div class=" text-nowrap rounded-md bg-zinc-700 px-2 py-1 text-xs">
								Login required
							</div>
						</div>
					{/if}
				</button>

				{#if user && user.id === comment.user.id}
					<button
						class="flex items-center rounded-md px-2 py-1 text-start text-sm hover:bg-zinc-600"
						disabled={!user}
						onclick={deleteModal.openModal}
					>
						<div class="mr-2 flex items-center justify-center text-base">
							<i class="material-symbols--delete-outline-rounded"></i>
						</div>
						<div class="text-sm">Delete</div>
					</button>
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

	.material-symbols--flag-2-outline-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M7 13v8q0 .425-.288.713T6 22t-.712-.288T5 21V4q0-.425.288-.712T6 3h13.525q.275 0 .488.125t.337.325t.162.438t-.062.487L19 8l1.45 3.625q.1.25.063.488t-.163.437t-.337.325t-.488.125zm0-2h11.05l-.9-2.25Q17 8.4 17 8t.15-.75l.9-2.25H7zm0 0V5z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--delete-outline-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
