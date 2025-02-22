<script>
	import { goto } from '$app/navigation';
	import FileForm from '$lib/components/FileForm.svelte';
	import FileInput from '$lib/components/FileInput.svelte';
	import TagFormInput from '$lib/components/TagFormInput.svelte';
	import TagInput from '$lib/components/TagInput.svelte';
	import TagRemove from '$lib/components/TagRemove.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { API_URL } from '$lib/config.js';
	import { ungroupTags } from '$lib/utils';

	const tagTypes = ['parody', 'character', 'artist', 'general'];
	let tags = $state({});
	let fileForm = $state(null);
	let titleInput = $state(null);
	let error = $state('');

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

	async function updatePost(postId, title, tags) {
		try {
			const response = await fetch(`${API_URL}/posts/${postId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, tags }),
				credentials: 'include'
			});

			if (response.ok) {
				goto(`/post/${postId}`);
			}
		} catch (error) {
			throw error;
		}
	}

	async function createPost() {
		if (!fileForm.validForm()) {
			error = 'File required';
			return;
		}
		if (!titleInput.validInput()) {
			error = titleInput.getError();
			return;
		}

		const formData = new FormData();
		const title = titleInput.getValue();
		const files = fileForm.getFiles();

		formData.append('title', title);
		files.forEach((f) => {
			if (f.file) {
				formData.append('files', f.file);
			}
		});

		try {
			const response = await fetch(`${API_URL}/posts`, {
				method: 'POST',
				body: formData,
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				const tagData = ungroupTags($state.snapshot(tags));
				await updatePost(data.id, data.title, tagData);
			}
		} catch (error) {
			throw error;
		}
	}
</script>

<div class="flex flex-col items-center pb-10 pt-20">
	{#if error}
		<div class="mb-4 flex w-full max-w-md flex-col">
			<div
				class="break-words rounded-md border border-red-600 bg-red-400 px-4 py-1 text-sm font-semibold text-red-950"
			>
				{error}
			</div>
		</div>
	{/if}

	<div class="w-full max-w-md overflow-hidden rounded-md bg-zinc-900">
		<div class="mb-4 bg-zinc-800 p-4">
			<div class="text-lg font-semibold">Create post</div>
		</div>

		<div class="mb-8 px-4">
			<div class="mb-1 text-sm font-semibold text-zinc-300">Title</div>
			<TextInput
				className={'w-full rounded-sm bg-zinc-800 px-2 py-2 text-sm outline-none resize-none'}
				rows={1}
				name="Title"
				placeholder="Title"
				resize={true}
				minLength={0}
				maxLength={50}
				allowNumbers={true}
				allowSymbols={true}
				bind:this={titleInput}
			/>
		</div>

		<div class="mb-8 px-4">
			<TagFormInput {addTag} />

			{#each tagTypes as type}
				{#if tags[type] && tags[type].length > 0}
					<div class="mb-1 mt-2 text-xs font-semibold text-zinc-400">
						<!-- Capitalize first letter -->
						{String(type).charAt(0).toUpperCase() + String(type).slice(1)}
					</div>
					<div class="mb-4 flex flex-wrap items-center gap-2 rounded-md border border-zinc-600 p-2">
						{#each tags[type] as tag}
							<button onclick={() => removeTag(tag)}>
								<TagRemove {tag} />
							</button>
						{/each}
					</div>
				{/if}
			{/each}
		</div>

		<div class="px-4">
			<div class="mb-1 text-sm font-semibold text-zinc-300">Files *</div>

			<FileForm bind:this={fileForm} />
		</div>

		<div class="mt-8 bg-zinc-800 p-4">
			<button class="rounded-md bg-zinc-700 p-2 px-4 text-sm hover:bg-zinc-600" onclick={createPost}
				>Create post
			</button>
		</div>
	</div>
</div>

<!-- <div class="flex gap-4 px-4 pb-10 pt-14">
	<div
		class="flex max-h-full w-full max-w-sm flex-col overflow-auto border border-zinc-600 bg-zinc-800"
	>
		<div class="mb-4 border-b border-zinc-600 p-4 font-semibold">Detail</div>

		<div class="w-full px-4">
			<div class="mb-2 text-sm font-semibold text-zinc-300">Title</div>
			<TextInput
				className={'max-h-64 w-full resize-none bg-zinc-700 px-2 py-1 outline-none'}
				rows={1}
				name={'Title'}
				placeholder={'Title'}
				resize={true}
				minLength={0}
				maxLength={50}
				allowNumbers={true}
				allowSymbols={true}
				bind:this={titleInput}
			/>
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

	{#if error}
		<div class="flex w-full max-w-xs flex-col">
			<div
				class="break-words border border-red-600 bg-red-400 px-4 py-1 text-sm font-semibold text-red-950"
			>
				{error}
			</div>
		</div>
	{/if}
</div> -->
