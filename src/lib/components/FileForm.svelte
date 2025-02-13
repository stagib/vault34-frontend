<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/config';
	import FileInput from './FileInput.svelte';

	let files = $state([{ file: null, preview: null, type: null, id: Date.now() }]);

	function addFile() {
		let file = { id: Date.now(), file: null, preview: null };
		files = [...files, file];
	}

	function removeFile(id) {
		files = files.filter((file) => file.id !== id);
	}

	function handleFileChange(event, id) {
		const newFile = event.target.files[0];

		files = files.map((file) => {
			if (file.id === id) {
				const fileType = newFile ? newFile.type.split('/')[0] : null;

				return {
					...file,
					file: newFile,
					preview: newFile ? URL.createObjectURL(newFile) : null,
					type: fileType
				};
			}
			return file;
		});
	}

	export function validForm() {
		return files.some((file) => file.file !== null);
	}

	export function getFiles() {
		return files;
	}
</script>

{#each files as file (file.id)}
	<FileInput {handleFileChange} {removeFile} {file} />
{/each}

<button
	class="mt-4 flex items-center justify-center gap-1 bg-zinc-700 p-1 px-2 text-sm hover:bg-zinc-600"
	onclick={addFile}
	aria-label="add-file"
>
	<i class="material-symbols--add-2-rounded"></i>
	<div class="text-xs">Add file</div>
</button>

<style>
	.material-symbols--add-2-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
