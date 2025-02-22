<script>
	import { clickOutside } from '$lib/utils';
	import TagSearch from './TagSearch.svelte';

	let { addTag } = $props();

	const tagTypes = ['parody', 'character', 'artist', 'general'];
	let currentType = $state(tagTypes[0]);
	let showTagTypes = $state(false);

	function changeType(type) {
		currentType = type;
		showTagTypes = false;
	}
</script>

<div class="flex items-center gap-2">
	<div class="flex w-full flex-col gap-1">
		<div class="mb-1 text-sm font-semibold text-zinc-300">Tags</div>
		<TagSearch
			inputClass="w-full rounded-md text-zinc-300 bg-zinc-800 p-2 text-sm outline-none"
			resultsClass="absolute top-full z-50 flex flex-col w-full bg-zinc-800 py-2 rounded-md border border-zinc-600"
			placeholder="Add tags"
			type={currentType}
			{addTag}
		>
			{#snippet result(tag)}
				<div class="flex items-center gap-2 p-2 hover:bg-zinc-700">
					<div class="text-xs">{tag.name}</div>
					<div class="text-xs text-zinc-400">{tag.count}</div>
				</div>
			{/snippet}
		</TagSearch>
	</div>
	<div class="flex flex-col gap-1">
		<div class="mb-1 text-sm font-semibold text-zinc-300">Type</div>
		<div class="relative w-24" use:clickOutside={() => (showTagTypes = false)}>
			<button
				class="flex w-full items-center gap-1 rounded-md bg-zinc-800 p-2 px-4 text-zinc-300"
				onclick={() => (showTagTypes = !showTagTypes)}
			>
				<div class="text-sm">{currentType}</div>
			</button>
			{#if showTagTypes}
				<div class="absolute top-full z-10 w-full">
					<div class="rounded-md border border-zinc-700 bg-zinc-800 py-1">
						{#each tagTypes as type}
							{#if type != currentType}
								<button
									class="w-full p-1 px-4 text-start text-sm hover:bg-zinc-700"
									onclick={() => changeType(type)}
								>
									{type}
								</button>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
