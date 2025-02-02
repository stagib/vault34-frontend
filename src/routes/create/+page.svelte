<script>
	import FileForm from '$lib/components/FileForm.svelte';
	import FileInput from '$lib/components/FileInput.svelte';
	import TagInput from '$lib/components/TagInput.svelte';
	import TagRemove from '$lib/components/TagRemove.svelte';
	import TitleInput from '$lib/components/TitleInput.svelte';
	import { API_URL } from '$lib/config.js';
	import { ungroupTags } from '$lib/utils';

	const tagTypes = ['parody', 'character', 'artist', 'general'];
	let tags = $state({});
	let fileForm = $state(null);
	let titleInput = $state(null);

	function removeTag(tag) {
		tags[tag.type] = tags[tag.type].filter((t) => t !== tag);
	}

	function addTag(tag) {
		if (!tags[tag.type]) {
			tags[tag.type] = [];
		}

		const exist = tags[tag.type].some((t) => t.name === tag.name);
		if (!exist) {
			tags[tag.type] = [...tags[tag.type], tag];
		}
	}

	async function createPost() {
		const tagData = ungroupTags($state.snapshot(tags));
		const title = titleInput.validTitle();

		if (!fileForm.validForm()) return;

		try {
			const response = await fetch(`${API_URL}/posts`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, tags: tagData }),
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				fileForm.submitFiles(data.id);
			}
		} catch (error) {
			throw error;
		}
	}
</script>

<div class="flex h-screen gap-4 px-4 pb-10 pt-14">
	<div
		class="flex max-h-full w-full max-w-sm flex-col overflow-auto border border-zinc-600 bg-zinc-800"
	>
		<div class="mb-4 border-b border-zinc-600 p-4 font-semibold">Detail</div>

		<div class="w-full px-4">
			<TitleInput bind:this={titleInput} />
		</div>

		<div class="mb-8 mt-8 flex items-center gap-2 border-b border-zinc-600 p-4">
			<div class="font-semibold">Tags</div>
		</div>

		<div class="px-4">
			{#each tagTypes as type}
				<div class="mb-8">
					<TagInput {type} {addTag} />
					<div class="mt-2 flex flex-wrap items-center gap-2 px-2">
						<div class="mb-1 text-sm font-semibold text-zinc-300">{type}:</div>
						{#each tags[type] as tag}
							<button onclick={() => removeTag(tag)}>
								<TagRemove {tag} />
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="relative flex w-full max-w-sm flex-col border border-zinc-600 bg-zinc-800">
		<div
			class="absolute top-0 z-10 flex w-full items-center gap-2 border-b border-zinc-600 bg-zinc-800 p-4"
		>
			<div class="font-semibold">Files</div>
			<div class="text-xs text-zinc-300">* required</div>
		</div>

		<div class="max-h-full overflow-auto pb-16 pt-20">
			<div class="px-4">
				<FileForm bind:this={fileForm} />
			</div>
		</div>

		<div class="absolute bottom-0 right-0 flex w-full justify-end bg-zinc-800 p-4">
			<button
				class="border border-zinc-600 bg-zinc-700 p-1 px-4 text-sm hover:bg-zinc-600"
				onclick={createPost}
				>Create post
			</button>
		</div>
	</div>
</div>
