<script>
	let { files = [], preLoad = 3, postId, total = 1 } = $props();
	let currentIndex = $state(0);

	function prevFile() {
		currentIndex = (currentIndex - 1 + files.length) % files.length;
	}

	function nextFile() {
		currentIndex = (currentIndex + 1) % files.length;
	}

	$effect(() => {
		if (postId) {
			currentIndex = 0;
		}
	});
</script>

<div class="relative max-h-screen flex-1 overflow-hidden">
	{#if total > 1}
		<div class="absolute left-2 top-2 rounded-lg bg-zinc-600 px-2 py-1 text-sm">
			{currentIndex + 1} / {total}
		</div>

		<button
			class="absolute bottom-1/2 left-2 flex items-center justify-center rounded-full bg-zinc-600 p-1 text-3xl"
			aria-label="previous-button"
			onclick={prevFile}
		>
			<i class="material-symbols--chevron-left-rounded"></i>
		</button>

		<button
			class="absolute bottom-1/2 right-2 flex items-center justify-center rounded-full bg-zinc-600 p-1 text-3xl"
			aria-label="next-button"
			onclick={nextFile}
		>
			<i class="material-symbols--chevron-right-rounded"></i>
		</button>
	{/if}

	{#if files.length > 0}
		{#if files[currentIndex].content_type.split('/')[0] == 'image'}
			<img class="h-full" src={files[currentIndex].src} alt="" />
		{:else if files[currentIndex].content_type.split('/')[0] == 'video'}
			<video class="h-full" controls loop>
				<source src={files[currentIndex].src} />
				<track kind="captions" />
			</video>
		{/if}
	{/if}
</div>

<style>
	.material-symbols--chevron-left-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--chevron-right-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
