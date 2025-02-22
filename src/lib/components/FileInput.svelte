<script>
	let { handleFileChange, removeFile, file } = $props();
	let showPreview = $state(false);
	let input = $state(null);
</script>

<div class="mb-2">
	<div
		class="flex items-center rounded-t-md bg-zinc-800 px-2 {showPreview
			? 'rounded-b-none'
			: 'rounded-b-md'}"
	>
		<input
			class="w-full text-sm text-zinc-200"
			type="file"
			hidden
			onchange={(e) => handleFileChange(e, file.id)}
			bind:this={input}
		/>
		<button
			class="flex w-full items-center gap-2 overflow-hidden py-2 text-sm"
			onclick={() => input.click()}
		>
			{#if file.file}
				<div class="truncate text-sm">{file.file.name}</div>
			{:else}
				<div class="text-sm text-zinc-300">No file selected.</div>
			{/if}
		</button>
		<div class="flex gap-1">
			{#if showPreview}
				<button
					class="flex items-center justify-center rounded-full bg-zinc-700 p-1 text-sm hover:bg-zinc-600"
					aria-label="hide"
					onclick={() => (showPreview = false)}
				>
					<i class="material-symbols--keyboard-arrow-up-rounded"></i>
				</button>
			{:else}
				<button
					class="flex items-center justify-center rounded-full bg-zinc-700 p-1 text-sm hover:bg-zinc-600"
					aria-label="expand"
					onclick={() => (showPreview = true)}
				>
					<i class="material-symbols--keyboard-arrow-down-rounded"></i>
				</button>
			{/if}
			<button
				class="flex items-center justify-center rounded-full bg-zinc-700 p-1 text-sm hover:bg-zinc-600"
				aria-label="remove-file"
				onclick={() => removeFile(file.id)}
			>
				<i class="material-symbols--close-rounded"></i>
			</button>
		</div>
	</div>

	{#if showPreview}
		{#if file.type === 'image'}
			<div class="mb-2 rounded-b-md border border-t-0 border-zinc-600">
				<img src={file.preview} alt="" />
			</div>
		{:else if file.type === 'video'}
			<div class="mb-2 rounded-b-md border border-t-0 border-zinc-600">
				<video controls loop>
					<source src={file.preview} />
					<track kind="captions" />
				</video>
			</div>
		{/if}
	{/if}
</div>

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

	.material-symbols--keyboard-arrow-down-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--keyboard-arrow-up-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
