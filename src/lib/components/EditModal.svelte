<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/config';
	import { clickOutside, groupTags, ungroupTags } from '$lib/utils';
	import Modal from './Modal.svelte';
	import TagInput from './TagInput.svelte';
	import TagRemove from './TagRemove.svelte';

	let { post } = $props();

	const tagTypes = ['parody', 'character', 'artist', 'general'];
	let modal = $state(null);
	let title = $state(post.title);
	let tags = $state(groupTags(post.tags));

	export function openModal() {
		modal.openModal();
	}

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

	async function save() {
		const tagData = ungroupTags($state.snapshot(tags));

		try {
			const response = await fetch(`${API_URL}/posts/${post.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, tags: tagData }),
				credentials: 'include'
			});

			if (response.ok) {
				modal.closeModal();
				window.location.reload();
			}
		} catch (error) {
			throw error;
		}
	}

	$effect(() => {
		title = post.title;
		tags = groupTags(post.tags);
	});
</script>

<Modal bind:this={modal}>
	{#snippet content()}
		<div class="flex h-full w-full items-center justify-center bg-zinc-950 bg-opacity-85">
			<div
				class="max-h-screen w-full max-w-sm overflow-auto rounded-md border border-zinc-600 bg-zinc-800 py-4"
				use:clickOutside={modal.closeModal}
			>
				<div
					class="mb-4 flex justify-between border border-x-0 border-t-0 border-zinc-600 px-4 pb-4"
				>
					<div class="font-semibold">Edit post</div>
					<button
						class="flex items-center justify-center rounded-full p-1 text-lg hover:bg-zinc-600"
						aria-label="close-button"
						onclick={modal.closeModal}
						><i class="material-symbols--close-rounded"></i>
					</button>
				</div>

				<div class="px-4">
					<div class="mb-1 text-sm font-semibold">Title</div>
					<input
						class="w-full rounded-sm bg-zinc-700 px-2 py-1 outline-none"
						placeholder="Title"
						bind:value={title}
					/>
				</div>

				<div class="mb-4 mt-8 border border-x-0 border-t-0 border-zinc-600 px-4 py-4">
					<div class="font-semibold">Tags</div>
				</div>

				<div class="mt-4 px-4">
					{#each tagTypes as type}
						<div class="mb-8">
							<TagInput {type} {addTag} />
							<div class="mt-2 flex flex-wrap items-center gap-2 px-2">
								<div class="mb-1 text-sm font-semibold">{type}:</div>
								{#each tags[type] as tag}
									<button onclick={() => removeTag(tag)}>
										<TagRemove {tag} />
									</button>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-2 flex items-center justify-end gap-2 px-4">
					<button class="rounded-md px-2 py-1 text-sm hover:bg-zinc-700" onclick={modal.closeModal}
						>Cancel
					</button>
					<button class="rounded-md bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600" onclick={save}
						>Save
					</button>
				</div>
			</div>
		</div>
	{/snippet}
</Modal>

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
</style>
