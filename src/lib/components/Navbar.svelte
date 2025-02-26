<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/config';
	import { clickOutside } from '$lib/utils';
	import MoreNavbar from './MoreNavbar.svelte';
	import TextInput from './TextInput.svelte';

	let { user } = $props();
	let query = $state('');
	let searchResults = $state([]);
	let queryInput = $state(null);
	let queryValue = $state('');
	let showResults = $state(true);
	let showSearchbar = $state(false);

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

<div class="fixed top-0 z-50 w-full border-b border-zinc-700 bg-zinc-950 px-0 sm:px-4">
	<div class="z-50 flex w-full items-center justify-between rounded-b-md py-2">
		{#if !showSearchbar}
			<div class="flex text-sm">
				<a class="bg-transparent px-4 py-1" href="/">Vault34</a>
				<a class="hidden bg-transparent px-4 py-1 text-zinc-200 sm:block" href="/create">Create</a>
			</div>
		{/if}

		<div
			class="relative mx-2 w-full sm:visible {showSearchbar ? 'visible' : 'invisible'}"
			use:clickOutside={() => (showResults = false)}
		>
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

		{#if showSearchbar}
			<button onclick={() => (showSearchbar = false)}>
				<div class="bg-transparent py-1 pr-2 text-sm text-zinc-200">Cancel</div>
			</button>
		{/if}

		{#if !showSearchbar}
			<div class="block sm:hidden">
				<button
					class="flex items-center justify-center rounded-full p-2 text-xl text-zinc-200 hover:bg-zinc-700"
					aria-label="search-button"
					onclick={() => (showSearchbar = true)}
				>
					<i class="material-symbols--search-rounded"></i>
				</button>
			</div>
		{/if}

		{#if !showSearchbar}
			{#if user}
				<a class="hidden bg-transparent px-4 py-1 sm:block" href={`/user/${user.username}`}>
					<div class="text-sm text-zinc-200">Profile</div>
				</a>
			{:else}
				<a class="hidden bg-transparent px-4 py-1 text-sm text-zinc-200 sm:block" href="/login"
					>Login</a
				>
			{/if}

			<MoreNavbar {user} />
		{/if}
	</div>
</div>

<style>
	.material-symbols--search-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
