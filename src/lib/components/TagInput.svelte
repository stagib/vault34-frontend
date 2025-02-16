<script>
	import { API_URL } from '$lib/config';
	import Tag from './Tag.svelte';

	let { type, addTag } = $props();

	let searchResults = $state([]);
	let query = $state('');

	function validTagName(tagName) {
		const maxLength = 30;
		const minLength = 1;
		const regex = /^[a-zA-Z0-9 ]*$/;

		if (tagName.length < minLength) return false;
		if (tagName.length > maxLength) return false;
		if (!regex.test(tagName)) return false;
		return true;
	}

	async function searchTags(query) {
		if (!validTagName(query)) {
			searchResults = [];
			return;
		}

		try {
			const response = await fetch(`${API_URL}/tags?query=${query}&type=${type}`);
			if (response.ok) {
				const data = await response.json();
				searchResults = data.items;
			}
		} catch (error) {
			throw error;
		}
	}

	function createTag(input) {
		if (!validTagName(input)) return;
		let validName = input.toLowerCase().trim().replace(/\s+/g, ' ');
		return { name: validName, type: type, count: 0 };
	}

	function handleTag(tag) {
		searchResults = [];
		query = '';
		addTag(tag);
	}

	function handleInput(event) {
		const input = event.target.value;
		searchTags(input);
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			let tag = createTag(event.target.value);
			if (tag) {
				handleTag(tag);
			}
		}
	}
</script>

<div class="relative">
	<input
		class="w-full rounded-sm bg-zinc-700 p-2 text-sm outline-none"
		placeholder={`Add ${type}`}
		oninput={handleInput}
		onkeypress={handleKeyPress}
		bind:value={query}
	/>
	{#if searchResults.length > 0}
		<div class="absolute top-full z-50 flex w-full flex-wrap gap-2 bg-zinc-900 p-2 py-4">
			{#each searchResults as tag}
				<button onclick={() => handleTag(tag)}>
					<Tag {tag} />
				</button>
			{/each}
		</div>
	{/if}
</div>
