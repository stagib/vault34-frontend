<script>
	import DeleteModal from './DeleteModal.svelte';
	import DropdownMenu from './DropdownMenu.svelte';
	import EditModal from './EditModal.svelte';
	import ReportModal from './ReportModal.svelte';

	let { user = null } = $props();
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
		<div class="absolute left-full top-0 z-20">
			<div class="flex w-32 flex-col rounded-md border border-zinc-700 bg-zinc-800 py-2">
				<button
					class="group relative flex items-center px-2 py-1 text-start hover:bg-zinc-700"
					disabled={!user}
					onclick={editModal.openModal}
				>
					<div class="mr-2 flex items-center justify-center text-base">
						<i class="material-symbols--edit-outline-rounded"></i>
					</div>
					<div class="text-sm">Edit</div>

					{#if !user}
						<div class="absolute left-full top-0 hidden group-hover:block">
							<div class=" text-nowrap rounded-md bg-zinc-700 px-2 py-1 text-xs">
								Login required
							</div>
						</div>
					{/if}
				</button>
				<button
					class="group relative flex items-center px-2 py-1 text-start hover:bg-zinc-700"
					disabled={!user}
					onclick={reportModal.openModal}
				>
					<div class="mr-2 flex items-center justify-center text-base">
						<i class="material-symbols--flag-2-outline-rounded"></i>
					</div>
					<div class="text-sm">Report</div>

					{#if !user}
						<div class="absolute left-full top-0 hidden group-hover:block">
							<div class=" text-nowrap rounded-md bg-zinc-700 px-2 py-1 text-xs">
								Login required
							</div>
						</div>
					{/if}
				</button>

				{#if user}
					<button
						class="rounded-sm px-2 py-1 text-start text-sm hover:bg-zinc-600"
						disabled={!user}
						onclick={deleteModal.openModal}>Delete</button
					>
				{/if}
			</div>
		</div>
	{/snippet}
</DropdownMenu>

{#if user}
	<ReportModal bind:this={reportModal} targetId={user.id} targetType={'user'} />
	<EditModal bind:this={editModal} {post} />
	<DeleteModal bind:this={deleteModal} postId={user.id} />
{/if}

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

	.material-symbols--edit-outline-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-1 2q-.425 0-.712-.288T3 20v-2.425q0-.4.15-.763t.425-.637L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763t-.437.662l-12.6 12.6q-.275.275-.638.425t-.762.15zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z'/%3E%3C/svg%3E");
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
</style>
