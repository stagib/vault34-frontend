<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/config';
	import { clickOutside } from '$lib/utils';
	import TextInput from './TextInput.svelte';

	let { user } = $props();
	let query = $state('');
	let searchResults = $state([]);
	let queryInput = $state(null);
	let queryValue = $state('');
	let showResults = $state(true);

	async function searchTags() {
		if (!queryInput.validInput()) {
			searchResults = [];
			return;
		}

		const query = queryInput.getValue();
		showResults = true;

		try {
			const response = await fetch(`${API_URL}/tags?${query ? `&query=${query}` : ''}`);
			if (response.ok) {
				const data = await response.json();
				searchResults = data.items;
			}
		} catch (error) {
			throw error;
		}
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			const query = queryInput.getValue();
			showResults = false;
			goto(`/${query ? `?query=${query}` : ''}`);
		}
	}

	function tagClick(tagName) {
		queryValue = tagName;
		showResults = false;
	}
</script>

<div class="fixed top-0 z-50 w-full border-b border-zinc-700 bg-zinc-950 px-4">
	<div class="z-50 flex w-full items-center justify-between rounded-b-md py-2">
		<div class="flex text-sm">
			<a class="bg-transparent px-4 py-1" href="/">Vault34</a>
			<a class="bg-transparent px-4 py-1 text-zinc-200" href="/create">Create</a>
		</div>

		<div class="relative mx-2 w-full" use:clickOutside={() => (showResults = false)}>
			<TextInput
				className={'w-full bg-zinc-900 px-2 py-1 rounded-md outline-none border border-zinc-700'}
				placeholder={'Search'}
				name={'Query'}
				minLength={1}
				maxLength={30}
				onInput={searchTags}
				onClick={() => (showResults = true)}
				onKeypress={handleKeyPress}
				bind:this={queryInput}
				bind:value={queryValue}
			/>

			{#if showResults}
				{#if searchResults.length > 0}
					<div class="absolute top-full z-50 w-full gap-2 rounded-md bg-zinc-800 py-2">
						{#each searchResults as tag}
							<a href={`/?query=${tag.name}`} onclick={() => tagClick(tag.name)}>
								<div class="flex items-center gap-2 p-2 hover:bg-zinc-700">
									<div class="text-xs">{tag.name}</div>
									<div class="text-xs text-zinc-400">{tag.count}</div>
								</div>
							</a>
						{/each}
					</div>
				{/if}
			{/if}
		</div>

		{#if user}
			<a class="bg-transparent px-4 py-1 text-sm text-zinc-200" href={`/user/${user.username}`}
				>Profile</a
			>
		{:else}
			<a class="bg-transparent px-4 py-1 text-sm text-zinc-200" href="/login">Login</a>
		{/if}
	</div>
</div>
