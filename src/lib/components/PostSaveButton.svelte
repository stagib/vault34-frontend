<script>
	import PostSaveModal from './PostSaveModal.svelte';

	let { user, postId } = $props();
	let modal = $state(null);

	function handleClick() {
		if (!user) return;
		modal.openModal();
	}
</script>

<button
	class="group relative flex items-center gap-1 rounded-md bg-zinc-700 p-1 px-2 hover:bg-zinc-600"
	onclick={handleClick}
>
	<div class="flex items-center justify-center text-base">
		<i class="material-symbols--bookmark-outline-rounded"></i>
	</div>
	<div class="text-sm">Save</div>

	{#if !user}
		<div class="absolute left-0 top-full hidden group-hover:block">
			<div class="text-nowrap rounded-md bg-zinc-700 px-2 py-1 text-xs">Login required</div>
		</div>
	{/if}
</button>

<PostSaveModal bind:this={modal} {user} {postId} />

<style>
	.material-symbols--bookmark-outline-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
