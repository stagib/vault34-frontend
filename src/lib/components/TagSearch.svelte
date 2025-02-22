<script>
	import { API_URL } from '$lib/config';
	import Tag from './Tag.svelte';

	let { type, addTag, inputClass, resultsClass, result, placeholder } = $props();

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

<div class="relative w-full">
	<input
		class={inputClass}
		{placeholder}
		oninput={handleInput}
		onkeypress={handleKeyPress}
		bind:value={query}
	/>
	{#if searchResults.length > 0}
		<div class={resultsClass}>
			{#each searchResults as tag}
				<button onclick={() => handleTag(tag)}>
					{@render result(tag, handleTag)}
				</button>
			{/each}
		</div>
	{/if}
</div>
