<script>
	import TextInput from './TextInput.svelte';

	let error = $state('');
	let value = $state('');

	export function validTitle() {
		// if (error) return null;
		return value;
	}
</script>

<!-- <div class="flex h-8 items-end">
	{#if error}
		<div class="mb-2 text-xs text-rose-400">{error}</div>
	{:else}
		<div class="mb-2 text-sm font-semibold text-zinc-300">Title</div>
	{/if}
</div> -->

<div class="mb-2 text-sm font-semibold text-zinc-300">Title</div>

<TextInput
	className={'max-h-64 w-full resize-none bg-zinc-700 px-2 py-1 outline-none'}
	rows={1}
	placeholder={'Title'}
	resize={true}
	minLength={3}
	maxLength={50}
	bind:value
	bind:error
/>
